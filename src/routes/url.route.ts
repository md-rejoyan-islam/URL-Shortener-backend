import express from "express";
import {
  createShortUrl,
  deleteUrl,
  getAllUrls,
  getSingleShortUrl,
  updateUrl,
} from "../controllers/url.controller";

const urlRouter = express.Router();

urlRouter.get("/", getAllUrls);
urlRouter.post("/", createShortUrl);
urlRouter.get("/:shortUrl", getSingleShortUrl);
urlRouter.patch("/:shortUrl", updateUrl);
urlRouter.delete("/:shortUrl", deleteUrl);

export default urlRouter;
