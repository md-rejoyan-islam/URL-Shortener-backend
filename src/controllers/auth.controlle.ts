import { Request, Response } from "express";
import { successResponse } from "../helper/response-handler";
import {
  loginService,
  meService,
  registerService,
} from "../services/auth.service";
import { RequestWithUser } from "../types/types";

export const register = async (req: Request, res: Response) => {
  const user = await registerService(req);

  successResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    payload: {
      data: user,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const token = await loginService(req);

  successResponse(res, {
    statusCode: 200,
    message: "Successfully Login",
    payload: {
      token,
    },
  });
};

export const me = async (req: RequestWithUser, res: Response) => {
  const user = req?.me && (await meService(req?.me.id));

  successResponse(res, {
    statusCode: 200,
    message: "Logged in user details",
    payload: {
      data: user,
    },
  });
};
