const express = require("express");
const Earring = require("../models/Earrings");
const {removeBackground} = require("../utils/imageProcessor");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/api/earrings", async (req, res) => {
  try {
    const { name, imagePath } = req.body;
    
    // Check if image exists
    const originalPath = path.join(__dirname, "..", "public", "images", imagePath);
    if (!fs.existsSync(originalPath)) {
      return res.status(404).json({ error: "Image file not found" });
    }
    
    // Create directory for processed images if it doesn't exist
    const processedDir = path.join(__dirname, "..", "public", "images", "processed");
    if (!fs.existsSync(processedDir)) {
      fs.mkdirSync(processedDir, { recursive: true });
    }
    
    // Set output path for processed image
    const filename = path.basename(imagePath);
    const outputPath = path.join(processedDir, `nobg_${filename}`);
    
    // Process the image
    await removeBackground(originalPath, outputPath);
    
    // Create relative paths for storage in the database
    const originalRelativePath = `/images/${imagePath}`;
    const processedRelativePath = `/images/processed/nobg_${filename}`;
    
    // Save to database
    const newEarring = new Earring({
      name,
      originalImageUrl: originalRelativePath,
      processedImageUrl: processedRelativePath
    });
    
    await newEarring.save();
    res.status(201).json(newEarring);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all earrings
router.get("/api/earrings", async (req, res) => {
  try {
    const earrings = await Earring.find();
    res.status(200).json(earrings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;