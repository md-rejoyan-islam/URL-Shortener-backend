import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/response-handler";
import {
  createShortUrlService,
  deleteUrlService,
  getAllUrlsService,
  getSingleShortUrlService,
  redirectUrlService,
  updateUrlService,
} from "../services/url.service";
import { RequestWithUser } from "../types/types";

export const getAllUrls = asyncHandler(async (_req: Request, res: Response) => {
  const urls = await getAllUrlsService;

  successResponse(res, {
    statusCode: 200,
    message: "URLs fetched successfully",
    payload: {
      data: urls,
    },
  });
});

export const createShortUrl = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const url = await createShortUrlService(
      req.body.originalUrl,
      req.body.shortUrl,
      req?.me?.id
    );
    successResponse(res, {
      statusCode: 201,
      message: "Short URL created successfully",
      payload: {
        data: url,
      },
    });
  }
);

export const getSingleShortUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const url = await getSingleShortUrlService(shortUrl);

    successResponse(res, {
      statusCode: 200,
      message: "Short URL fetched successfully",
      payload: {
        data: url,
      },
    });
  }
);

export const redirectUrl = asyncHandler(async (req: Request, res: Response) => {
  const url = await redirectUrlService(req);

  res.redirect(url.originalUrl);
});

export const deleteUrl = asyncHandler(async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  const url = await deleteUrlService(shortUrl);

  successResponse(res, {
    statusCode: 200,
    message: "URL deleted successfully",
    payload: {
      data: url,
    },
  });
});

export const updateUrl = asyncHandler(async (req: Request, res: Response) => {
  const { url } = req.params;
  const { originalUrl, shortUrl } = req.body;

  const newUrl = await updateUrlService(url, shortUrl, originalUrl);
  successResponse(res, {
    statusCode: 200,
    message: "URL updated successfully",
    payload: {
      data: newUrl,
    },
  });
});
