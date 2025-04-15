const mongoose = require("mongoose");

const EarringSchema = new mongoose.Schema({
  name: String,
  originalimageUrl: String,
  processedImageUrl: String, 
});

module.exports = mongoose.model("Earring", EarringSchema);