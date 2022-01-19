import cors from "cors";
import { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import routes from "./controllers/user/main.user";
import { consortium } from "./common/messages";
import { variables } from "./common/config";
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
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    dotenv.config();
    this.app.use(
      (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
      ) => {
        // set content type json
        try {
          decodeURIComponent(request.path);
        } catch (error) {
          response.json({ message: consortium.welcome });
        }
        response.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        response.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        next();
      }
    );
  }
  private setMongoConfig() {
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    mongoose
      .connect(variables.DB_URL.value, options)
      .then(() => {
        console.log("mongo connect");
      })
      .catch((err) => console.log(err));
  }

  private setControllers() {
    this.app.use("/api", routes);
  }
}

export default new Server().app;
