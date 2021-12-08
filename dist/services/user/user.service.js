"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_1 = require("../../models/user");
class UserServices {
    createUser(user) {
        const newUser = new user_1.User(user);
        return newUser.save();
    }
}
exports.UserServices = UserServices;
//# sourceMappingURL=user.service.js.map