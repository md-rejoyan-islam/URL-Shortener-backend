import { Response } from "express";
import { nodeEnv } from "../config/secret";

// clear cookie
export const clearCookie = (res: Response, cookieName: string) => {
  res.clearCookie(cookieName, {
    secure: nodeEnv === "production",
    sameSite: nodeEnv === "production" ? "none" : "lax",
    // sameSite: nodeEnv === "development" ? "strict" : "none",
    httpOnly: true,
  });
};

// set cookie
export const setCookie = ({
  res,
  cookieName,
  cookieValue,
  maxAge = 3600 * 24 * 7,
}: {
  res: Response;
  cookieName: string;
  cookieValue: string | undefined;
  maxAge?: number | undefined;
}) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    maxAge,
    secure: nodeEnv === "production", // only https
    sameSite: "lax", // when use cross site
    // sameSite: nodeEnv === "development" ? "strict" : "none", // when use cross site,
  });
};
