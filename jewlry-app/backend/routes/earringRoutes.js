const express = require("express");
const Earring = require("../models/Earrings");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/api/earrings", upload.single("image"), async (req, res) => {
  try {
    const newEarring = await Earring.create({
      name: req.body.name,
      imageUrl: req.file.path // Cloudinary gives you the URL here
    });

    res.status(201).json(newEarring);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
