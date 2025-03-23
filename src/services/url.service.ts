import { Request } from "express";
import geoip from "geoip-lite";
import createError from "http-errors";
import generateRandomId from "../helper/random-id";
import urlModel from "../models/url.model";

export const getAllUrlsService = async () => {
  return await urlModel.find().sort({ createdAt: -1 });
};

export const createShortUrlService = async (
  originalUrl: string,
  shortUrl: string,
  userId: string | undefined
) => {
  if (shortUrl) {
    const exist = await urlModel.exists({ shortUrl });

    if (exist) {
      throw createError.Conflict("Short URL already exists");
    }
  }

  const result = await urlModel.create({
    originalUrl,
    shortUrl: shortUrl || generateRandomId(6),
    user: userId || null,
  });

  return result;
};

export const getSingleShortUrlService = async (shortUrl: string) => {
  const url = await urlModel.find({ shortUrl: { $eq: shortUrl } });

  if (!url) {
    throw createError.NotFound("Short URL not found");
  }

  return url;
};

export const redirectUrlService = async (req: Request) => {
  const { shortUrl } = req.params;
  const ip = req.ip as string;
  const geo = geoip.lookup(ip);

  const url = await urlModel.findOneAndUpdate(
    { shortUrl },
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

  if (!url) {
    throw createError.NotFound("URL not found");
  }

  return url;
};

export const deleteUrlService = async (shortUrl: string) => {
  const url = await urlModel.findOneAndDelete({ shortUrl });

  if (!url) {
    throw createError.NotFound("URL not found");
  }

  return url;
};

export const updateUrlService = async (
  url: string,
  shortUrl: string,
  originalUrl: string
) => {
  const newUrl = await urlModel.findOneAndUpdate(
    { shortUrl: url },
    { originalUrl, shortUrl },
    { new: true }
  );

  if (!newUrl) {
    throw createError.NotFound("URL not found");
  }

  return newUrl;
};
