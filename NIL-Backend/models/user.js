const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    contactNumber: {
      type: String,
      unique: true,
      default: "", // will be added after registration
    },
    address: {
      type: String,
      default: "", // will be added after registration
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
