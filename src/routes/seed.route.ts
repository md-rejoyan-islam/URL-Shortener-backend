import express from "express";
import { seedUrls, seedUsers } from "../controllers/seed.controller";

const seedRouter = express.Router();

seedRouter.route("/users").get(seedUsers);
seedRouter.route("/urls").get(seedUrls);

export default seedRouter;
