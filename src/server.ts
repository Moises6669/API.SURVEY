import cors from 'cors';
import { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { MainRoutes } from './routes/main';
import config from './config/config';

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
        this.app.use('/api',this.routes)
        dotenv.config();
    }
    private setMongoConfig() {
        mongoose.connect(config.DB.URI,this.mongoOptions);
        const connection = mongoose.connection;
        connection.once('open', () => { console.log('mongodb connection stablished') });
        connection.on('error', err => {
            console.error(err);
            process.exit(0);
        })
    }

    private mongoOptions() {
        const options: ConnectOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }
        return options;
    }

    private routes() {
       return new MainRoutes().get();
    }
}


export default Server;