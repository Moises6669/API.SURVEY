const { getTemplate, sendEmail } = require("../../../services/Email");
const { uploadProfileImage } = require("../../../services/Cloudinary");
const { generateToken } = require("../../../services/Tokens");
const User = require("../../../models/user.models");
const fs = require("fs-extra");

const signup = async (req, res) => {
  let body = req.body;
  let image = req.file.path;

  try {
    //upload image to Cloudinary
    const imageProfile = await uploadProfileImage(image);

    const user = new User({
      username: body.username,
      email: body.email,
      img: imageProfile,
      password: body.password,
    });

    const token = generateToken(user, "1h");

    const template = getTemplate(user.username, token);

    sendEmail(user.email, "Confirme su Email", template);

    await user.save();

    //Delete images of the server
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      ok: true,
      message: "Confirme su email",
    });
  } catch (error) {
    return res.json(400).json({
      ok: false,
    });
  }
};

module.exports = {
  signup,
};
