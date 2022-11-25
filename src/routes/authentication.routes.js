const express = require("express");
const passport = require("passport");
const routes = express.Router();

const { login, signup } = require("../controllers/init");
const { confirmEmail } = require("../utils/init");
const { gooogleAuuth } = require("../helpers/init");
const { facebookAuth } = require("../helpers/init");

const {
  emailValidate,
  userSingupValidate,
  usernameValidate,
  messageValidate,
  uploads,
} = require("../middlewares/init");

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

routes.get("/confirmEmail/:token", confirmEmail);

routes.post("/google", gooogleAuuth.oauthGoogle);

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
