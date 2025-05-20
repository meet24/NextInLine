const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

const {
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
} = require("../controllers/forgotPasswordController");

router.post("/send-otp", sendResetOtp);
router.post("/verify-otp", verifyResetOtp);
router.post("/reset", resetPassword);

module.exports = router;
