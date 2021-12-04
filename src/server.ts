import cors from 'cors';
import { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// const Server = express();
class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.setConfigure();
        this.setMongoConfig();
    }

    private setConfigure() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        dotenv.config();
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/survey").then((db) => { console.log('data base connect'); })
    }
}


export default Server;