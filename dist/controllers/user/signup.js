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
exports.signup = void 0;
const user_1 = require("../../models/schemas/user");
const response_1 = require("../../utils/response");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        const newUser = yield user_1.User.create(body);
        res.status(response_1.codes.success).json({
            ok: true,
            newUser,
        });
    }
    catch (error) {
        res.status(response_1.codes.bad_request).json({
            ok: false,
            error,
        });
    }
});
exports.signup = signup;
//# sourceMappingURL=signup.js.map