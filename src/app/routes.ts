import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { redirectUrl } from "../controllers/url.controller";
import { successResponse } from "../helper/response-handler";
import errorHandler from "../middlewares/errorHandler";
import authRouter from "../routes/auth.route";
import seedRouter from "../routes/seed,route";
import urlRouter from "../routes/url.route";

const route = express();

route.get("/", (_req: Request, res: Response) => {
  successResponse(res, {
    message: "Welcome to URL Shortener API",
    statusCode: 200,
  });
});

route.get("/health", (_req: Request, res: Response) => {
  successResponse(res, {
    message: "Server is up and running",
    statusCode: 200,
  });
});

route.get("/:shortId", redirectUrl);

const routes = [
  {
    path: "auth",
    route: authRouter,
  },
  {
    path: "seeds",
    route: seedRouter,
  },
  {
    path: "urls",
    route: urlRouter,
  },
];

routes.forEach((router) => {
  route.use(`/api/v1/${router.path}`, router.route);
});

// not found route
route.use(
  asyncHandler(async (_req: Request, res: Response) => {
    throw new Error("Requested url not found on this server");
  })
);

// error handler
route.use(errorHandler);

export default route;
