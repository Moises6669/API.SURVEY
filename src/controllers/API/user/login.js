const User = require("../../../models/user.models");
const { generateToken, verifyToken } = require("../../../services/Tokens");
const bcryptjs = require("bcryptjs");
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({
      ok: false,
      message: "El usuario y contraseña son requeridos",
    });
  }

  const userFind = await User.findOne({ email: email });

  if (!userFind) {
    return res.status(404).json({
      message: "Error de autenticación, Nombre de Usuario no encontrado",
    });
  }

  if (userFind.verify === false) {
    return res.status(400).json({
      message: "Lo sentimos tu cuenta esta inactiva",
    });
  }
  if (!bcryptjs.compareSync(password, userFind.password)) {
    return res.status(400).json({
      message: "Contraseña incorrecta",
    });
  }
  const token = generateToken(userFind);

  return res.status(201).json({
    ok: true,
    message: "Usuario autenticado correctamente",
    token,
  });
};

module.exports = { login };
