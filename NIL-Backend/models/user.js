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
    ],
    notifications: [
    {
      type: {
        type: String,
        enum: ["appointment", "promo", "system"],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
