import cors from 'cors';
import { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import {MainRoutes} from './routes/main';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.setConfigure();
        this.setMongoConfig();
        this.routes();
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

    private routes(){
        new MainRoutes().createUse;
    }
}


export default Server;