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
const main_user_1 = require("./controllers/user/main.user");
const user_service_1 = require("./services/user/user.service");
const config_1 = __importDefault(require("./config/config"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.setConfigure();
        this.setMongoConfig();
        this.setControllers();
    }
    setConfigure() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        dotenv_1.default.config();
    }
    setMongoConfig() {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        mongoose_1.default.connect(config_1.default.DB.URI, options);
        const connection = mongoose_1.default.connection;
        connection.once("open", () => {
            return "mongodb connection stablished";
        });
        connection.on("error", (err) => {
            console.error(err);
            process.exit(0);
        });
        // if (process.env.NODE_ENV === "test") {
        //   mongoose.connection.close(function () {
        //     console.log("Mongoose connection disconnected");
        //   });
        // }
    }
    setControllers() {
        const user = new main_user_1.UserController(new user_service_1.UserServices());
        this.app.use("/api", user.router);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map