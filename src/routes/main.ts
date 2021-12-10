import {Router,Request,Response} from 'express';
import {UserController} from '../controllers/user/create.user';

export class MainRoutes {

    public route = Router();

    constructor() {
        this.createUse();
    }

    public createUse(){
        this.route.post('/createuser',new UserController().newUser);
    }

    public get(){
        this.route.get("/user"),(req:Request,res:Response) => {
            res.send("hello")
        }
    }

}
