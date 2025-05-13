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

module.exports = router;