import { Response } from "express";

// clear cookie
export const clearCookie = (res: Response, cookieName: string) => {
  res.clearCookie(cookieName, {
    secure: true,
    sameSite: "none",
    // secure: nodeEnv === "production",
    // sameSite: nodeEnv === "production" ? "none" : "lax",
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
    secure: true, // only https
    // secure: nodeEnv === "production", // only https
    sameSite: "none", // when use cross site
    // sameSite: nodeEnv === "development" ? "lax" : "none", // when use cross site,
  });
};
