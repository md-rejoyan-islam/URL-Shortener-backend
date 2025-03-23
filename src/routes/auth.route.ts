import express from "express";
import { login, me, register } from "../controllers/auth.controlle";
import { isLoggedIn } from "../middlewares/verify";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", isLoggedIn, me);

export default authRouter;
