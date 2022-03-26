const User = require("../../../models/user.models");
const { Token } = require("../../../services/Tokens");
const { getTemplate, sendEmail } = require("../../../services/Email");
const signup = async (req, res) => {
  let body = req.body;
  try {
    const user = new User(body);
    const token = new Token().generateToken(user, "1h");
    const template = getTemplate(user.username, token);
    sendEmail(user.email, "Confirme su Email", template);
    await user.save();
    return res.status(201).json({
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
