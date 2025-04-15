const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.ddopizu76,
  api_key: process.env.442399488738881,
  api_secret: process.env.A5PnH8hymzrdnnlSOQyV8OuLCBw
});

module.exports = cloudinary;