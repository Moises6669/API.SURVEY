const User = require("../../../models/user.models");
const { Token } = require("../../../services/Tokens");
const { getTemplate, sendEmail } = require("../../../services/Email");
const signup = async (req, res) => {
  let body = req.body;
  try {
    const user = new User(body);
    const token = new Token().generateToken(user, "5m");
    const template = getTemplate(user.username, token);
    sendEmail(user.email, "Confirme su Email", template);
    await user.save();
    if (user) {
      res.status(201).json({
        ok: true,
        message: "Usuario Regisrado, confirme su email",
        user,
        token,
      });
    }
  } catch (error) {
    return res.json(400).json({
      ok: false,
    });
  }
};

module.exports = {
  signup,
};
