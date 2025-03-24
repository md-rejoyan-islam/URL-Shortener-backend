import express from "express";
import {
  anlytics,
  createShortUrl,
  deleteUrl,
  getAllUrls,
  getSingleShortUrl,
  updateUrl,
} from "../controllers/url.controller";

import verifyJwtTokenAndPassed from "../middlewares/jwt-passed-verify";
import { isLoggedIn } from "../middlewares/verify";

const urlRouter = express.Router();

urlRouter.get("/", isLoggedIn, getAllUrls);
urlRouter.post("/", verifyJwtTokenAndPassed, createShortUrl);
urlRouter.get("/analytics", isLoggedIn, anlytics);
urlRouter.get("/:shortUrl", isLoggedIn, getSingleShortUrl);
urlRouter.patch("/:shortUrl", isLoggedIn, updateUrl);
urlRouter.delete("/:id", isLoggedIn, deleteUrl);

export default urlRouter;
