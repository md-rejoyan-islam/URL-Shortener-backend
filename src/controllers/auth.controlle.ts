import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/response-handler";
import {
  forgotPasswordService,
  loginService,
  meService,
  registerService,
  resetPasswordService,
} from "../services/auth.service";
import { RequestWithUser } from "../types/types";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await registerService(username, email, password);

  successResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    payload: {
      data: user,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { token, user } = await loginService(email, password);

  // cookies set
  // setCookie({
  //   res,
  //   cookieName: "token",
  //   cookieValue: await token,
  //   maxAge: 3600 * 24 * 7,
  // });

  successResponse(res, {
    statusCode: 200,
    message: "Successfully Login",
    payload: {
      token: token,
      user: user,
    },
  });
});

export const me = asyncHandler(async (req: RequestWithUser, res: Response) => {
  const user = await meService(req?.me?.email);

  successResponse(res, {
    statusCode: 200,
    message: "Logged in user details",
    payload: {
      data: user,
    },
  });
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const { protocol, host } = req;
    const resetLink = await forgotPasswordService(email, protocol, host);

    successResponse(res, {
      statusCode: 200,
      message: "Password reset link sent to your email",
      payload: {
        data: resetLink,
      },
    });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token, password } = req.body;

    await resetPasswordService(password, token);

    successResponse(res, {
      statusCode: 200,
      message: "Password reset successfully",
    });
  }
);
