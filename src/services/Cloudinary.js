const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadProfileImage = async (image) => {
  console.log(image)
  const image2 = await cloudinary.v2.uploader.upload(image);
  return image2.url;
};

module.exports = {
  uploadProfileImage,
};
