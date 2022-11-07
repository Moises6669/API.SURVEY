const { validationResult, body } = require("express-validator");
const User = require("../models/user.models");
const fs = require("fs-extra");

const user_singup_validate = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("El nombre de usuario es requerido")
      .not(),
    body("email")
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("El email no valido")
      .withMessage("El email es requerido"),
    body("password")
      .not()
      .notEmpty()
      .withMessage("la contraseña es requerida")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener almenos 8 caracteres"),
    body("passwordConfirmation")
      .notEmpty()
      .withMessage("La confirmacion de contraseña es requerida")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error(
            "La confirmación de la contraseña no coincide con la contraseña"
          );
        }
        return true;
      }),
  ];
};

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ error: true });
    req.token = token;
    req.user = user;
    next();
  });
};

const usernameValidate = (req, res, next) => {
  const username = req.body.username;
  User.findOne({ username }, (err, data) => {
    if (data) {
      fs.unlinkSync(req.file.path);
      res.status(400).json({
        ok: false,
        message: "Lo sentimos este nombre de usuario ya esta en uso",
      });
      return;
    }
    next();
  });
};

const emailValidate = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email }, (err, data) => {
    if (data) {
      fs.unlinkSync(req.file.path);
      res.status(400).json({
        ok: false,
        message: "Lo sentimos este email ya esta en uso",
      });
      return;
    }
    next();
  });
};

const message_Validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) return next();

  let errors;

  fs.unlinkSync(req.file.path);

  error.array().map((Err) => {
    errors = JSON.stringify(Err.msg);
    console.log(Err);
  });

  return res.status(422).json({
    ok: false,
    error: errors,
  });
};

module.exports = {
  auth,
  user_singup_validate,
  message_Validate,
  usernameValidate,
  emailValidate,
};
