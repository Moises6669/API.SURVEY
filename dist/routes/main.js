"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoutes = void 0;
const express_1 = require("express");
const create_user_1 = require("../controllers/user/create.user");
class MainRoutes {
    constructor() {
        this.route = (0, express_1.Router)();
        this.createUse();
    }
    createUse() {
        this.route.post('/createuser', new create_user_1.UserController().newUser);
    }
    get() {
        this.route.get("/user"), (req, res) => {
            res.send("hello");
        };
    }
}
exports.MainRoutes = MainRoutes;
//# sourceMappingURL=main.js.map