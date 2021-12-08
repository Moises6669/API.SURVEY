import {IUser} from '../../interfaces/user.interface';
import {User} from '../../models/user';

export class UserServices { 
    public createUser(user:IUser) :  Promise<IUser> {
        const newUser = new User(user);
        return newUser.save();
    }
}