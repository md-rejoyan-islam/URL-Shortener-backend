import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/secret";
import { clearCookie } from "../helper/cookies";
import { verifyJwtTokenWithNext } from "../helper/jwt-verify";
import { errorResponse } from "../helper/response-handler";
import userModel from "../models/user.model";
import { RequestWithUser } from "../types/types";

export const isLoggedIn = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const headerToken = authHeader?.split(" ")[1];

    const token: string = req?.cookies?.token || headerToken;

    if (!token) {
      throw createError(
        401,
        "Unauthorized, Access token not found. Please login."
      );
    }
    verifyJwtTokenWithNext(token, req, res, next);
  }
);

export const isLoggedOut = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authToken: string = req?.cookies?.accessToken;

    // check auth token
    if (authToken) {
      jwt.verify(authToken, jwtSecret, async (err: any, decode: any) => {
        if (err) {
          // clear cookie
          clearCookie(res, "accessToken");

          // response send
          return errorResponse(res, {
            statusCode: 400,
            message: "Unauthorized, Invalid access token.Please login again",
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
          // response send
          return errorResponse(res, {
            statusCode: 400,
            message: "Unauthorized, User not found.Please login again",
          });
        } else {
          return errorResponse(res, {
            statusCode: 400,
            message: "User is already loggedin",
          });
        }
      });
    } else {
      next();
    }
  }
);
