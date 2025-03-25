import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { successResponse } from "../helper/response-handler";
import urlModel from "../models/url.model";
import {
  createShortUrlService,
  deleteUrlService,
  getAllUrlsService,
  getSingleShortUrlService,
  redirectUrlService,
  updateUrlService,
} from "../services/url.service";
import { RequestWithUser } from "../types/types";

export const getAllUrls = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const urls = await getAllUrlsService(req?.me?.id);

    successResponse(res, {
      statusCode: 200,
      message: "URLs fetched successfully",
      payload: {
        data: urls,
      },
    });
  }
);

export const createShortUrl = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const url = await createShortUrlService(
      req.body.originalUrl,
      req.body.customAlias,
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
  async (req: RequestWithUser, res: Response) => {
    const { shortUrl } = req.params;
    const url = await getSingleShortUrlService(shortUrl, req?.me?.id);

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

  res.redirect(url);
});

export const deleteUrl = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;

    const url = await deleteUrlService(id, req?.me?.id);

    successResponse(res, {
      statusCode: 200,
      message: "URL deleted successfully",
      payload: {
        data: url,
      },
    });
  }
);

export const updateUrl = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { url } = req.params;
    const { originalUrl, shortUrl } = req.body;

    const newUrl = await updateUrlService(
      url,
      shortUrl,
      originalUrl,
      req?.me?.id
    );
    successResponse(res, {
      statusCode: 200,
      message: "URL updated successfully",
      payload: {
        data: newUrl,
      },
    });
  }
);

export const anlytics = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const userId = req?.me?.id;
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const result = await urlModel
      .aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $facet: {
            totalClicks: [{ $unwind: "$clicks" }, { $count: "count" }],
            lastMonthClicks: [
              { $unwind: "$clicks" },
              { $match: { "clicks.timestamp": { $gte: lastMonth } } },
              { $count: "count" },
            ],
            totalLinks: [{ $count: "count" }],
            activeLinks: [
              { $match: { "clicks.0": { $exists: true } } },
              { $count: "count" },
            ],
            avgClickRate: [
              { $project: { clickCount: { $size: "$clicks" } } },
              { $group: { _id: null, avg: { $avg: "$clickCount" } } },
            ],
            topLink: [
              { $project: { shortUrl: 1, clickCount: { $size: "$clicks" } } },
              { $sort: { clickCount: -1 } },
              { $limit: 1 },
            ],
            locationClicks: [
              { $unwind: "$clicks" },
              {
                $group: { _id: "$clicks.location.country", count: { $sum: 1 } },
              },
              { $sort: { count: -1 } },
              {
                $project: {
                  country: "$_id", // Rename _id to name
                  clicks: "$count",
                  _id: 0,
                },
              },
            ],
            deviceClicks: [
              { $unwind: "$clicks" },
              { $group: { _id: "$clicks.device.type", value: { $sum: 1 } } },
              {
                $project: {
                  name: "$_id", // Rename _id to name
                  value: 1,
                  _id: 0,
                },
              },
            ],
            last15DaysClicks: [
              { $unwind: "$clicks" },
              {
                $match: {
                  "clicks.timestamp": {
                    $gte: new Date(
                      new Date().setDate(new Date().getDate() - 15)
                    ),
                  },
                },
              },
              {
                $project: {
                  date: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$clicks.timestamp",
                    },
                  },
                },
              },
              {
                $group: {
                  _id: "$date",
                  clicks: {
                    $sum: 1,
                  },
                },
              },
              { $sort: { _id: 1 } },
              {
                $project: {
                  date: "$_id",
                  clicks: 1,
                  _id: 0,
                },
              },
            ],
          },
        },

        {
          $addFields: {
            totalClicks: { $arrayElemAt: ["$totalClicks.count", 0] },
            lastMonthClicks: { $arrayElemAt: ["$lastMonthClicks.count", 0] },
            totalLinks: { $arrayElemAt: ["$totalLinks.count", 0] },
            activeLinks: { $arrayElemAt: ["$activeLinks.count", 0] },
            avgClickRate: { $arrayElemAt: ["$avgClickRate.avg", 0] },
            topLink: { $arrayElemAt: ["$topLink", 0] },
            locationClicks: "$locationClicks",
            deviceClicks: "$deviceClicks",
            // handle missing days in last 15 days
            last15DaysClicks: {
              $map: {
                input: {
                  $range: [0, 15, 1],
                },
                as: "i",
                in: {
                  $let: {
                    vars: {
                      date: {
                        $dateToString: {
                          format: "%Y-%m-%d",
                          date: {
                            $subtract: [
                              new Date(),
                              { $multiply: ["$$i", 24 * 60 * 60 * 1000] }, // Subtract days
                            ],
                          },
                        },
                      },
                    },
                    in: {
                      $let: {
                        vars: {
                          clickedData: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$last15DaysClicks",
                                  as: "click",
                                  cond: { $eq: ["$$click.date", "$$date"] },
                                },
                              },
                              0,
                            ],
                          },
                        },
                        in: {
                          clicks: {
                            $ifNull: ["$$clickedData.clicks", 0],
                          },
                          date: "$$date", // return only date and clicks
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $addFields: {
            activePercentage: {
              $multiply: [{ $divide: ["$activeLinks", "$totalLinks"] }, 100],
            },
            percentageChange: {
              $cond: {
                if: { $gt: ["$lastMonthClicks", 0] },
                then: {
                  $multiply: [
                    {
                      $divide: [
                        { $subtract: ["$totalClicks", "$lastMonthClicks"] },
                        "$lastMonthClicks",
                      ],
                    },
                    100,
                  ],
                },
                else: 0,
              },
            },
          },
        },
      ])
      .exec();

    successResponse(res, {
      statusCode: 200,
      message: "URL analytics",
      payload: {
        data: result[0],
      },
    });
  }
);
