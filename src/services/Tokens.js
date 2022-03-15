const jwt = require("jsonwebtoken");

class Token {
  constructor(token) {
    this.tokenData = token;
  }
  verifyToken = () => {
    let data;

    if (!this.tokenData) {
      throw new Error("Se necesita el Token");
    }

    jwt.verify(this.tokenData, "secreta", (err, decode) => {
      if (err) {
        throw new Error("Token no valido");
      }
      data = decode.user;
    });
    return data;
  };
  generateToken = (user, expires = "1d") => {
    const token = jwt.sign({ user }, "secreta", { expiresIn: expires });
    return token;
  };
}

module.exports = { Token };
