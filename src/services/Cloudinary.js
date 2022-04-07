const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadProfileImage = async (image) => {await cloudinary.v2.uploader.upload(image)};

module.exports = {
  uploadProfileImage,
};
