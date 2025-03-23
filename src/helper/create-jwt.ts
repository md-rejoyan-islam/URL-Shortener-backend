import createError from "http-errors";
import jwt from "jsonwebtoken";
import { errorLogger } from "./logger";

const createJWT = async (
  payload: any,
  secretKey: string,
  expiresIn: number
) => {
  try {
    // payload check
    if (typeof payload !== "object" || !payload) {
      throw createError(404, "Payload must be a non-empty object.");
    }

    // secret key check
    if (typeof secretKey !== "string" || !secretKey) {
      throw createError(404, "Secret key must be a non-empty string");
    }

    // create token and return
    return jwt.sign(payload, secretKey, {
      expiresIn,
    });
  } catch (error) {
    errorLogger.error(error);
  }
};

// export token
export default createJWT;
