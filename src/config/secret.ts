import dotenv from "dotenv";

dotenv.config();

const { PORT, MONGO_URI, CORS_WHITELIST } = process.env;

export const port: number = +(PORT || 5000);

export const mongoUri: string = MONGO_URI || "";

export const corsWhitelist: string[] = (CORS_WHITELIST || "").split(",");

export const jwtSecret: string = process.env.JWT_SECRET || "secret";

export const nodeEnv: string = process.env.NODE_ENV || "production";

export const serverUrl: string =
  process.env.SERVER_URL || "https://url-shortener-server-hpvc.onrender.com";

export const jwtExpiresIn: number = +(process.env.JWT_EXPIRES_IN || 2592000);
