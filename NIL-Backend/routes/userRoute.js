const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteUser,
  getAccountPage,
  updatePreferences,
  addFavourite,
  removeFavourite,
} = require("../controllers/userController");

const {
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
} = require("../controllers/forgotPasswordController");

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

router.get("/account", protect, getAccountPage);
router.put("/preferences", protect, updatePreferences);
router.post("/favourites", protect, addFavourite);
router.delete("/favourites/:itemId", protect, removeFavourite);
router.delete("/delete", protect, deleteUser);

module.exports = router;
