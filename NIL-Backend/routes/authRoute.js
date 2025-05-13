const express = require("express");
const passport = require("passport");
const router = express.Router();

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