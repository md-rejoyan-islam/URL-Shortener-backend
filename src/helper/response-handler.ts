import { Response } from "express";
import { errorLogger } from "./logger";

export const errorResponse = (
  res: Response,
  {
    statusCode = 500,
    message = "Unknown Server Error",
    errors,
  }: {
    statusCode: number;
    message: string;
    errors?: any;
  }
) => {
  errorLogger.error(message);

  return res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
      errors,
    },
  });
};

export const successResponse = (
  res: Response,
  {
    statusCode = 200,
    message = "Success",
    payload,
  }: {
    statusCode: number;
    message: string;
    payload?: any;
  }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...payload,
  });
};
