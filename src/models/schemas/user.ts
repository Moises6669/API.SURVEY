import { Schema, model } from "mongoose";

import { IUser } from "../../interfaces/user.interface";

import bcrypt from "bcryptjs";

let salt: number = 12;

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

Userschema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

Userschema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

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
