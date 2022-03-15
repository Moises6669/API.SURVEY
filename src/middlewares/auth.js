const { validationResult, body } = require("express-validator");
const User = require("../models/user.models");

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
      .withMessage("La contraseña debe tener almenos 8 caracteres")
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,16}$/)
      .withMessage("Su contraseña es muy vulnerable")
      .custom((value) => {
        let palabras = [
          "12345678",
          "admin12345",
          "admin12345678",
          "12345admin",
          "password",
          "12345password",
          "1234568contraseña",
          "contraseña",
        ];

        palabras.forEach((element) => {
          if (value === element) {
            throw new Error("La contraseña debe ser mas segura");
          }
        });
        return true;
      }),
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
    if (!user)
      return res.json({
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

const usernameValidate = (req, res, next) => {
  const username = req.body.username;
  User.findOne({ username }, (err, data) => {
    if (data) {
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

  error.array().map((Err) => {
    errors = JSON.stringify(Err.msg);
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
