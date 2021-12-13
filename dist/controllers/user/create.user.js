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
const user_service_1 = require("../../services/user/user.service");
class UserController {
    constructor() {
        this.newUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_service_1.UserServices;
                yield user.createUser(req.body);
                res.status(200).json({
                    data: user
                });
            }
            catch (error) {
                res.status(400).json({
                    error
                });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=create.user.js.map