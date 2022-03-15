const express = require("express");
const routes = express.Router();

//Controllers
const { signup } = require("../user/signup");
const { login } = require("../user/login");
const { oauthGoogle } = require("../user/Google");
const { confirmEmail } = require("../user/confirEmail");
//Middlewares
const {
  user_singup_validate,
  message_Validate,
  emailValidate,
  usernameValidate,
} = require("../../../middlewares/auth");

routes.post(
  "/signup",
  [user_singup_validate(), message_Validate, usernameValidate, emailValidate],
  signup
);

routes.post("/login", login);

routes.get("/confifrEmail/:token", confirmEmail);

routes.post("/google", oauthGoogle);

module.exports = routes;
