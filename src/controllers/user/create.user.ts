import {Request,Response} from "express";
import {UserServices} from "../../services/user/user.service";

export class UserController {
    public newUser = async (req:Request,res:Response) => {
        try {
            const user =  new UserServices;
            await user.createUser(req.body);
            res.status(200).json({
                data:user
            })
        } catch (error) {
            res.status(400).json({
                error
            })
        }
    }
}