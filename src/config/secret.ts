import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  MONGO_URI,
  CORS_WHITELIST,
  SERVER_URL,
  JWT_SECRET,
  NODE_ENV,
  JWT_EXPIRES_IN,
  CLIENT_URL,
  QR_GENERATOR_URL,
} = process.env;

export const port: number = +PORT!;

export const mongoUri: string = MONGO_URI || "";

export const corsWhitelist: string[] = CORS_WHITELIST!.split(",");

export const jwtSecret: string = JWT_SECRET!;

export const nodeEnv: string = NODE_ENV!;

export const serverUrl: string = SERVER_URL!;

export const jwtExpiresIn: number = +JWT_EXPIRES_IN!;

export const clientUrl: string = CLIENT_URL!;

export const qrGeneratorUrl: string = QR_GENERATOR_URL!;

export const passwordResetTokenExpiration: number = 600; // 10 minutes
