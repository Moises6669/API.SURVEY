import cors from "cors";
import { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import routes from './controllers/user/main.user'
import config from "./config/config";
import {extractParameterFromURL} from './utils/platform';
import { consortium } from "./common/messages";
class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfigure();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfigure() {
    this.app.use(morgan("dev"));
    this.app.use(cors({
      origin: '*'
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    dotenv.config();
    this.app.use((request: express.Request, response: express.Response, next: express.NextFunction)=>{
      try {
        decodeURIComponent(request.path)
      } catch (error) {
        response.json({ message: consortium.welcome })
      }
    })
  }
  private setMongoConfig() {
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(config.DB.URI, options);

    const connection = mongoose.connection;

    connection.once("open", () => {
      return "mongodb connection stablished";
    });
    connection.on("error", (err) => {
      console.error(err);
      process.exit(0);
    });
  }

  private setControllers() {;
    this.app.use("/api", routes);
  }
}

export default new Server().app;
