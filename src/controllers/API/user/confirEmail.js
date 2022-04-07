const User = require("../../../models/user.models");
const { Token } = require("../../../services/Tokens");

const confirmEmail = async (req, res) => {
  let token = req.params.token;
  let userData = new Token(token).verifyToken();
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    req.status(404).json({
      message: "No se encontro un usuario con este email",
    });
  }

  const userUpdate = await User.updateOne({ _id: user.id }, { verify: true });
  !userUpdate
    ? res.status(404).json({ ok: false, message: "Usuario no encontrado" })
    : res.status(201).redirect("http://localhost:4000/login");
};

module.exports = {
  confirmEmail,
};
