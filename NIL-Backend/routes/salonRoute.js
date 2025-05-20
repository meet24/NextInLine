const express = require("express");
const router = express.Router();
const Salon = require("../models/salon");

// TEMP: Add a test salon
router.post("/add", async (req, res) => {
  try {
    const salon = await Salon.create(req.body);
    res.status(201).json(salon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;