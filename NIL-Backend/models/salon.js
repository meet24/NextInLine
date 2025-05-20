const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: String,
    services: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salon", salonSchema);