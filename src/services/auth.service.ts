import createError from "http-errors";
import {
  jwtExpiresIn,
  jwtSecret,
  passwordResetTokenExpiration,
} from "../config/secret";
import createJWT from "../helper/create-jwt";
import { isMatchedPassword } from "../helper/hash-password";
import userModel from "../models/user.model";

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  const exist = await userModel.exists({ email });

  if (exist) throw createError.Conflict("Already have an account.");

  console.log(username, email, password);

  const user = await userModel.create({
    username,
    email,
    password,
  });

  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await isMatchedPassword(password, user.password))) {
    throw createError.BadRequest("Invalid credentials");
  }

  const token = createJWT(
    { username: user.username, email: user.email },
    jwtSecret,
    jwtExpiresIn
  );

  console.log("Login token:", token, user);

  return { token, user };
};

import crypto from "crypto";

export const forgotPasswordService = async (
  email: string,
  protocol: string,
  host: string
) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw createError.NotFound("User not found");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashToken;

  user.resetPasswordExpires = new Date(
    Date.now() + passwordResetTokenExpiration * 1000
  );

  const resetUrl = `${protocol}://${host}/reset-password/${resetToken}`;

  try {
    // await sendPasswordResetMail({
    //   to: user.email,
    //   name: user.name,
    //   resetLink: resetUrl,
    // });
    await user.save();
  } catch (error) {
    throw createError.InternalServerError("Error sending email");
  }
};

export const resetPasswordService = async (password: string, token: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date(Date.now()) },
  });

  if (!user) {
    throw createError.NotFound("Invalid or expired password reset token");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};
export const meService = async (email?: string) => {
  const user = await userModel.findOne({ email }).select("-password");
  if (!user) {
    throw createError.NotFound("User not found");
  }
  return user;
};
