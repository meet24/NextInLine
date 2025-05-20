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
  getNotifications,
  markNotificationAsRead,
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

router.post("/forgot/send-otp", sendResetOtp);
router.post("/forgot/verify-otp", verifyResetOtp);
router.post("/forgot/reset", resetPassword);

router.get("/account", protect, getAccountPage);
router.put("/preferences", protect, updatePreferences);
router.post("/favourites", protect, addFavourite);
router.delete("/favourites/:itemId", protect, removeFavourite);
router.delete("/delete", protect, deleteUser);

const { addNotification } = require("../controllers/userController");
router.post("/notifications/add", protect, async (req, res) => {
  const { type, message } = req.body;
  await addNotification(req.user._id, type, message);
  res.status(201).json({ message: "Notification added" });
});
router.get("/notifications", protect, getNotifications);
router.put("/notifications/:notificationId/read", protect, markNotificationAsRead);

module.exports = router;

