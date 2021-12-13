"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
class UserController {
    /**
     *
     */
    constructor() {
        this.router = (0, express_1.Router)();
        this.sayHello = (req, res) => {
            try {
                res.json("hello");
                console.log("hola");
            }
            catch (error) { }
        };
        this.setRoutes();
    }
    setRoutes() {
        this.router.route("/hello").get(this.sayHello);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=main.user.js.map