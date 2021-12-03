"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.setConfig();
    }
    setConfig() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default);
        this.app.use((0, morgan_1.default)("dev"));
        dotenv_1.default.config();
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map