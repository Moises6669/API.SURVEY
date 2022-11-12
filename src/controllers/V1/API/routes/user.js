const express = require("express");
const routes = express.Router();
const passport = require("passport");

//Controllers
const { signup } = require("../user/signup");
const { login } = require("../user/login");
const { oauthGoogle } = require("../user/google");
const { confirmEmail } = require("../user/confirEmail");
const { facebook } = require("../user/facebook");

//Middlewares
const {
  userSingupValidate,
  messageValidate,
  emailValidate,
  usernameValidate,
} = require("../../../../middlewares/auth");

const { uploads } = require("../../../../middlewares/img.upload");

routes.post(
  "/signup",
  [
    uploads.single("img"),
    userSingupValidate(),
    messageValidate,
    usernameValidate,
    emailValidate,
  ],
  signup
);

routes.post("/login", login);

routes.get("/confifrEmail/:token", confirmEmail);

routes.post("/google", oauthGoogle);

routes.get("/auth/facebook", passport.authenticate("facebook"));

routes.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", {
    successRedirect: "/api/home",
    failureRedirect: "/fail",
  })
);

routes.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

routes.get("/home", (req, res) => {
  res.json({
    ok: true,
    message: "success",
  });
});
module.exports = routes;
