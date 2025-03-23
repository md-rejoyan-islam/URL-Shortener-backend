import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "../config/db";
import { port } from "../config/secret";
import route from "./routes";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookies set
app.use(cookieParser());

// routes
app.use(route);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
