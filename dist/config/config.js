"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtsecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/survey',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
};
//# sourceMappingURL=config.js.map