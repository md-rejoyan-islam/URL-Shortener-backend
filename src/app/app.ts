import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import corsOptions from "../config/cors-options";
import route from "./routes";

const app: Application = express();

// middleware for logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

// cookies set
app.use(cookieParser());

// routes
app.use(route);

// exporting the app
export default app;
