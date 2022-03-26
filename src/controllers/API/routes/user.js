const express = require("express");
const routes = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
//Controllers
const { signup } = require("../user/signup");
const { login } = require("../user/login");
const { oauthGoogle } = require("../user/Google");
const { confirmEmail } = require("../user/confirEmail");
const { facebook } = require("../user/Facebook");
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

routes.get("/auth/facebook", passport.authenticate("facebook"));

routes.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail",
  })
);

routes.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

routes.get("/", (req, res) => {
  res.send("Success");
});
module.exports = routes;
