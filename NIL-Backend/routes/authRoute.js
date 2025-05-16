const express = require("express");
const passport = require("passport");
const router = express.Router();



const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google/token", async (req, res) => {
  const { id_token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password: "google-oauth" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("Google token error:", err.message);
    res.status(401).json({ message: "Google token invalid" });
  }
});


// Initiate Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Success - generate JWT and send it back
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.send(`
      <h2>✅ Login Successful!</h2>
      <p>Welcome, ${req.user.name}</p>
      <p>Your JWT token:</p>
      <code>${token}</code>
    `);
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      token,
    });
  }
);

module.exports = router;