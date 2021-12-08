import { Schema, model } from 'mongoose';

import {IUser} from '../interfaces/user.interface';

const Userschema = new Schema({

    username: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    role: { type: String, required: false },
    verificated: { type: Boolean, required: false },
    google: { type: Boolean, required: false, default: false },

},{
    timestamps:true,
});

export const User = model<IUser>('Users',Userschema); 