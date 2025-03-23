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
