import { Request, Response } from "express";
import { User } from "../../models/schemas/user";
import { IUser } from "../../interfaces/user.interface";
import {codes} from '../../utils/response';

export const signup = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    const newUser = await User.create(body);
    res.status(codes.success).json({
      ok: true,
      newUser,
    });
  } catch (error) {
    res.status(codes.bad_request).json({
      ok: false,
      error,
    });
  }
};
