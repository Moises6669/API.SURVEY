"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const main_1 = require("./routes/main");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.setConfigure();
        this.setMongoConfig();
        this.routes();
    }
    setConfigure() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        dotenv_1.default.config();
    }
    setMongoConfig() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect("mongodb://localhost/survey").then((db) => { console.log('data base connect'); });
    }
    routes() {
        new main_1.MainRoutes().createUse;
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map