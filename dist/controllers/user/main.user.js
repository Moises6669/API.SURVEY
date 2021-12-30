"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
class UserController {
    /**
     *
     */
    constructor(userSservice) {
        this.userSservice = userSservice;
        this.router = (0, express_1.Router)();
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userSservice.createUser(req.body);
                res.status(201).send(user);
            }
            catch (error) {
                res.json({ error });
            }
        });
        this.sayHello = (req, res) => {
            try {
                res.json("hello");
            }
            catch (error) { }
        };
        this.setRoutes();
    }
    setRoutes() {
        this.router.route("/hello").get(this.sayHello);
        this.router.route("/newuser").post(this.createUser);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=main.user.js.map