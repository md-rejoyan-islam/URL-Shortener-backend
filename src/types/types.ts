import { Request } from "express";

import { Document, Types } from "mongoose";

export interface IUrl extends Document {
  _id: Types.ObjectId;
  originalUrl: string;
  shortUrl: string;
  clicks: {
    timestamp: Date;
    location: {
      country?: string | null;
      city?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    };
    device: {
      type: "mobile" | "desktop" | "tablet";
      os?: string | null;
      browser?: string | null;
    };
    ipAddress?: string | null;
  }[];
  shortId: string;
  qrCodeUrl?: string;
  user?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestWithUser extends Request {
  me?: Pick<IUser, "_id" | "email">;
}
