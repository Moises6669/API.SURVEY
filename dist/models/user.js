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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const salt = 12;
const Userschema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    role: { type: String, required: false },
    verificated: { type: Boolean, required: false },
    google: { type: Boolean, required: false, default: false },
}, {
    timestamps: true,
});
Userschema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        bcryptjs_1.default.hash(this.password, salt, (err, hash) => {
            if (err)
                return next(err);
            this.password = hash;
        });
    });
});
Userschema.methods.comparePasswords = function (candidatePassword, next) {
    bcryptjs_1.default.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return next(err, null);
        }
        next(null, isMatch);
    });
};
exports.User = (0, mongoose_1.model)("Users", Userschema);
//# sourceMappingURL=user.js.map