const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.registerUser = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      contactNumber,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // exclude password
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};

exports.updateProfile = async (req, res) => {
  const { contactNumber, address } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (contactNumber) user.contactNumber = contactNumber;
  if (address) user.address = address;

  await user.save();

  res.status(200).json({
    message: "Profile updated successfully",
    contactNumber: user.contactNumber,
    address: user.address,
  });
};

// NEW: GET FULL ACCOUNT
exports.getAccountPage = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};

// NEW: UPDATE COMMUNICATION PREFERENCES
exports.updatePreferences = async (req, res) => {
  const { emailNotifications, smsNotifications } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.communicationPreferences = {
    emailNotifications,
    smsNotifications,
  };

  await user.save();
  res.status(200).json({ message: "Preferences updated" });
};

// NEW: ADD TO FAVOURITES
exports.addFavourite = async (req, res) => {
  const { itemId } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.favourites.includes(itemId)) {
    user.favourites.push(itemId);
    await user.save();
  }

  res.status(200).json({ message: "Added to favourites" });
};

// NEW: REMOVE FROM FAVOURITES
exports.removeFavourite = async (req, res) => {
  const { itemId } = req.params;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.favourites = user.favourites.filter(id => id.toString() !== itemId);
  await user.save();

  res.status(200).json({ message: "Removed from favourites" });
};

// NEW: DELETE ACCOUNT
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.status(200).json({ message: "Account deleted" });
};