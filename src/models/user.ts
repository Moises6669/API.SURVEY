import { Schema, model } from "mongoose";

import { IUser } from "../interfaces/user.interface";

import bcrypt from "bcryptjs";

const salt: number = 12;

const Userschema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    role: { type: String, required: false },
    verificated: { type: Boolean, required: false },
    google: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

Userschema.pre("save", async function (this: IUser, next : (err ?: Error | undefined) => void) {
  if (!this.isModified('password')) {
    return next();
  }
    
    bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
        if (err) return next(err);
        this.password = hash;
    });
});

Userschema.methods.comparePasswords = function (
  candidatePassword: string,
  next: (err: Error | null, same: boolean | null) => void
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return next(err, null);
    }
    next(null, isMatch);
  });
};

export const User = model<IUser>("Users", Userschema);
