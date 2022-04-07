const jwt = require("jsonwebtoken");

verifyToken = (token) => {
  let data;

  if (token) {
    throw new Error("Se necesita el Token");
  }

  jwt.verify(token, "secreta", (err, decode) => {
    if (err) {
      throw new Error("Token no valido");
    }
    data = decode.user;
  });
  return data;
};
generateToken = (user, expires = "1d") => {
  const newToken = jwt.sign({ user }, "secreta", { expiresIn: expires });
  return newToken;
};

module.exports = { verifyToken, generateToken };
