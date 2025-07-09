import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { redirectUrl } from "../controllers/url.controller";
import { successResponse } from "../helper/response-handler";
import errorHandler from "../middlewares/errorHandler";
import authRouter from "../routes/auth.route";
import seedRouter from "../routes/seed.route";
import urlRouter from "../routes/url.route";

const swaggerDocument = YAML.load(
  path.join(__dirname, "../../docs/openapi.yaml")
);

const route = express();

// home route
route.get("/", (_req: Request, _res: Response) => {
  successResponse(_res, {
    message: "Welcome to URL Shortener API",
    statusCode: 200,
  });
});

// health check route
route.get("/health", (_req: Request, _res: Response) => {
  successResponse(_res, {
    message: "Server is up and running",
    statusCode: 200,
  });
});

// swagger documentation route
route.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// redirect route for short URLs
route.get("/:shortId", redirectUrl);

// API routes
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

// 404 not found route
route.use(
  asyncHandler(async (_req: Request, _res: Response) => {
    throw createError(404, `${_req.originalUrl} not found on this server`);
  })
);

// error handler
route.use(errorHandler);

export default route;
