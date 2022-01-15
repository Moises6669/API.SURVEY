"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = require("./signup");
const routes = (0, express_1.Router)();
routes.post('/newuser', signup_1.signup);
exports.default = routes;
//# sourceMappingURL=main.user.js.map