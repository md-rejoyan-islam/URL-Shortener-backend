import { Request } from "express";

export interface User {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface RequestWithUser extends Request {
  me?: User;
}

import { Document, Types } from "mongoose";

interface Click {
  timestamp: Date;
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  device?: {
    type?: string; // mobile, desktop, tablet
    os?: string;
    browser?: string;
  };
  ipAddress?: string;
}

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  user?: Types.ObjectId | null;
  clicks: Click[];
  createdAt: Date;
  updatedAt: Date;
}
