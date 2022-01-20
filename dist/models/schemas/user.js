"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let salt = 12;
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
    let user = this;
    if (user.isModified("password")) {
        bcryptjs_1.default.genSalt(salt, function (err, salt) {
            if (err)
                return next(err);
            bcryptjs_1.default.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
Userschema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
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