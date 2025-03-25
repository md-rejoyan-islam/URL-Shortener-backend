import { Request } from "express";
import geoip from "geoip-lite";
import createError from "http-errors";
import { clientUrl, serverUrl } from "../config/secret";
import isAuthorized from "../helper/authorize";
import generateRandomId from "../helper/random-id";
import urlModel from "../models/url.model";
import { IUrl } from "../types/types";

export const getAllUrlsService = async (id: string | undefined) => {
  return await urlModel
    .find({
      user: id,
    })
    .sort({ createdAt: -1 });
};

export const createShortUrlService = async (
  originalUrl: string,
  customAlias: string,
  userId: string | undefined
) => {
  const existOriginalUrl = await urlModel.findOne({
    originalUrl: { $eq: originalUrl },
  });

  if (existOriginalUrl) {
    return existOriginalUrl;
  }

  if (customAlias) {
    const exist = await urlModel.exists({ shortId: customAlias });

    if (exist) {
      throw createError.Conflict("Short URL already exists");
    }
  }

  const shortId = customAlias || generateRandomId(6);

  const result = await urlModel.create({
    originalUrl,
    shortUrl: serverUrl + "/" + shortId,
    shortId: shortId,
    user: userId || null,
  });

  return result;
};

export const getSingleShortUrlService = async (
  shortUrl: string,
  userId: string | undefined
) => {
  const url: IUrl | null = await urlModel.findOne({
    shortUrl: { $eq: shortUrl },
  });

  if (!url) {
    throw createError.NotFound("Short URL not found");
  } else {
    const id = url?.user?.toString();
    if (!id || !userId || !isAuthorized(id, userId)) {
      throw createError.Unauthorized("Unauthorized");
    }

    return url;
  }
};

export const redirectUrlService = async (req: Request) => {
  const { shortId } = req.params;

  const ip = req.ip as string;
  const geo = geoip.lookup(ip);

  const url = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        clicks: {
          ipAddress: ip,
          location: {
            country: geo?.country || null,
            city: geo?.city || null,
            latitude: geo?.ll?.[0] || null,
            longitude: geo?.ll?.[1] || null,
          },
          device: {
            type: req.headers["user-agent"]?.includes("Mobile")
              ? "mobile"
              : "desktop",
            os: req.headers["user-agent"]?.match(/\((.*?)\)/)?.[1],
            browser: req.headers["user-agent"]?.split("/")[0],
          },
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  return url ? url?.originalUrl : clientUrl;
};

export const deleteUrlService = async (
  id: string,
  userId: string | undefined
) => {
  const url = await urlModel.findByIdAndDelete(id);

  if (!url) {
    throw createError.NotFound("URL not found");
  } else {
    const id = url?.user?.toString();
    if (!id || !userId || !isAuthorized(id, userId)) {
      throw createError.Unauthorized("Unauthorized");
    }

    return url;
  }
};

export const updateUrlService = async (
  url: string,
  shortUrl: string,
  originalUrl: string,
  userId: string | undefined
) => {
  const newUrl = await urlModel.findOneAndUpdate(
    { shortUrl: url },
    { originalUrl, shortUrl },
    { new: true }
  );

  if (!newUrl) {
    throw createError.NotFound("URL not found");
  } else {
    const id = newUrl?.user?.toString();
    if (!id || !userId || !isAuthorized(id, userId)) {
      throw createError.Unauthorized("Unauthorized");
    }

    return newUrl;
  }
};
