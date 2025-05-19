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

router.post("/forgot/send-otp", sendResetOtp);
router.post("/forgot/verify-otp", verifyResetOtp);
router.post("/forgot/reset", resetPassword);

module.exports = router;

