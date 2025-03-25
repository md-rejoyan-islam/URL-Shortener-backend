import createError from "http-errors";
import { jwtExpiresIn, jwtSecret } from "../config/secret";
import createJWT from "../helper/create-jwt";
import hashedPassword, { isMatchedPassword } from "../helper/hash-password";
import userModel from "../models/user.model";

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  const exist = await userModel.exists({ email });

  if (exist) throw createError.Conflict("Already have an account.");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword(password),
  });

  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await userModel.findOne({ email });

  if (!user || !(await isMatchedPassword(password, user.password))) {
    throw createError.BadRequest("Invalid credentials");
  }

  const token = createJWT(
    { username: user.username, email: user.email },
    jwtSecret,
    jwtExpiresIn
  );

  return { token, user };
};
