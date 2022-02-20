const express = require("express");

const routes = express.Router();

const { signup } = require("../user/signup");

const { user_singup_validate,message_Validate } = require("../../../middlewares/auth");

routes.post("/api/signup", [user_singup_validate(),message_Validate], signup);

module.exports = routes;
