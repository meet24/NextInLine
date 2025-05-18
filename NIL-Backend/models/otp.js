const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 2 * 60 * 1000), // 10 mins
    index:{expires:0},
  },
});

module.exports = mongoose.model('Otp', otpSchema);
