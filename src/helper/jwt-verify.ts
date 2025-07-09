import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/secret";
import userModel from "../models/user.model";
import { RequestWithUser } from "../types/types";
import { clearCookie } from "./cookies";
import { errorResponse } from "./response-handler";

export const verifyJwtTokenWithNext = (
  token: string,
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  jwt.verify(token, jwtSecret, async (err: any, decode: any) => {
    if (err) {
      // clear cookie
      clearCookie(res, "accessToken");

      // response send
      return errorResponse(res, {
        statusCode: 400,
        message: "Unauthorized, Invalid access token.Please login again.",
      });
    }

    // find user
    const loginUser = await userModel.findOne({
      email: decode.email,
    });

    // if user not exist
    if (!loginUser) {
      // clear cookie
      clearCookie(res, "accessToken");
      // send response
      return errorResponse(res, {
        statusCode: 400,
        message: "Unauthorized, Please login .",
      });
    }

    req.me = {
      email: loginUser.email,
      _id: loginUser?._id,
    };

    next();
  });
};
