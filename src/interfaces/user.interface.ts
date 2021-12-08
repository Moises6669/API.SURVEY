import {Document} from 'mongoose';

export interface IUser extends Document {
    username:string,
    email:string,
    password:string,
    role:string,
    verificated:boolean,
    google:boolean
};