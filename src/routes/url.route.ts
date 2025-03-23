import express from "express";
import {
  createShortUrl,
  deleteUrl,
  getAllUrls,
  getSingleShortUrl,
  updateUrl,
} from "../controllers/url.controller";
import { isLoggedIn } from "../middlewares/verify";

const urlRouter = express.Router();

urlRouter.get("/", isLoggedIn, getAllUrls);
urlRouter.post("/", createShortUrl);
urlRouter.get("/:shortUrl", isLoggedIn, getSingleShortUrl);
urlRouter.patch("/:shortUrl", isLoggedIn, updateUrl);
urlRouter.delete("/:shortUrl", isLoggedIn, deleteUrl);

export default urlRouter;
