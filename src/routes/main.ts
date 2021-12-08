import {Router} from 'express';
import {UserController} from '../controllers/user/create.user';

export class MainRoutes {

    public route = Router();

    constructor() {
        this.createUse();
    }

    public createUse(){
        this.route.post('/api/createuser',new UserController().newUser);
    }

}
