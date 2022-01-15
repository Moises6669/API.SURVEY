import { Request, Response } from "express";
import { User } from "../../models/user";
import { IUser } from "../../interfaces/user.interface";

export const signup = async (req: Request, res: Response) => {
  let body: IUser = req.body;
  try {
    const newUser = await User.create(body);
    res.status(201).json({
      ok: true,
      newUser,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      error,
    });
  }
};
