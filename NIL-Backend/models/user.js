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
    },
    address: {
      type: String,
    },
        communicationPreferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      smsNotifications: {
        type: Boolean,
        default: false,
      },
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon", // or "Stylist", "Service"
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
