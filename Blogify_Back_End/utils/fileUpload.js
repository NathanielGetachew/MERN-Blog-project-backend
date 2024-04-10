const cloudinary = require('cloudinary').v2;
require("dotenv").config();

const { CloudinaryStorage } = require("multer-storage-cloudinary");

// configure cloudinary
cloudinary.config({
  cloud_name: "dpm9pvb6o",
  api_key: "398749344241819",
  api_secret: "UCkZ5fn5sQ_JI4JUTsND3I-27yg",
});
//  instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpeg", "jpg", "png"],
  params: {
    folder: "FILES",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = storage;
