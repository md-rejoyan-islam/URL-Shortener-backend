import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import corsOptions from "../config/cors-options";
import connectDB from "../config/db";
import { port } from "../config/secret";
import route from "./routes";

const app = express();

app.use(morgan("dev"));

// middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

// cookies set
app.use(cookieParser());

// routes
app.use(route);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
