import { Application } from 'express';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.setConfig();
    }

    private setConfig() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors)
        this.app.use(morgan("dev"));
        dotenv.config();
    }
}

export default new Server().app;