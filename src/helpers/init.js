const { generateToken, verifyToken } = require("./Tokens");
const { uploadProfileImage } = require("./Cloudinary");
const { getTemplate, sendEmail } = require("./Email");
const facebookAuth = require("./FacebookAuth");
const gooogleAuuth = require("./GoogleAuth");

module.exports = {
  generateToken,
  verifyToken,
  uploadProfileImage,
  getTemplate,
  sendEmail,
  facebookAuth,
  gooogleAuuth,
};
