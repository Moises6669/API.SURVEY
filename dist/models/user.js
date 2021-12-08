"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
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
exports.User = (0, mongoose_1.model)('Users', Userschema);
//# sourceMappingURL=user.js.map