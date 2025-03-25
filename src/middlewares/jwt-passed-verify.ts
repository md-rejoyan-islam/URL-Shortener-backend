import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/secret";
import userModel from "../models/user.model";
import { RequestWithUser, User } from "../types/types";

const verifyJwtTokenAndPassed = (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const headerToken = authHeader?.split(" ")[1];

  const token: string = req?.cookies?.token || headerToken;

  if (!token) {
    return next();
  }

  jwt.verify(token, jwtSecret, async (err: any, decode: any) => {
    if (err) {
      return next();
    }
    // find user
    const loginUser = await userModel.findOne({
      email: decode.email,
    });

    if (loginUser) {
      req.me = { ...loginUser, id: loginUser?._id.toString() } as User;
    }

    next();
  });
};

export default verifyJwtTokenAndPassed;
