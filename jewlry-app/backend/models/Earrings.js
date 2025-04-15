const mongoose = require("mongoose");

const EarringSchema = new mongoose.Schema({
  name: String,
  imageUrl: String
});

module.exports = mongoose.model("Earring", EarringSchema);
