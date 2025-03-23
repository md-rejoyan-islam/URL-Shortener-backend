import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/response-handler";
import urlModel from "../models/url.model";
import User from "../models/user.model";

const users = [
  {
    email: "test@gmail.com",
    password: "12345678",
    username: "test",
  },
  {
    email: "user@gmail.com",
    password: "12345678",
    username: "user",
  },
];

const urls = [
  {
    originalUrl: "https://example.com/article1",
    shortUrl: "abc123",
    user: "65f1234567890abcdef12345",
    createdAt: "2025-03-23T10:00:00Z",
    clicks: [
      {
        timestamp: "2025-03-23T12:00:00Z",
        location: {
          country: "USA",
          city: "New York",
          latitude: 40.7128,
          longitude: -74.006,
        },
        device: {
          type: "desktop",
          os: "Windows",
          browser: "Chrome",
        },
        ipAddress: "192.168.1.1",
      },
    ],
  },
  {
    originalUrl: "https://example.com/shop",
    shortUrl: "def456",
    user: "65f1234567890abcdef12346",
    createdAt: "2025-03-22T15:30:00Z",
    clicks: [
      {
        timestamp: "2025-03-23T16:00:00Z",
        location: {
          country: "India",
          city: "Mumbai",
          latitude: 19.076,
          longitude: 72.8777,
        },
        device: {
          type: "mobile",
          os: "Android",
          browser: "Firefox",
        },
        ipAddress: "192.168.1.2",
      },
      {
        timestamp: "2025-03-23T17:00:00Z",
        location: {
          country: "UK",
          city: "London",
          latitude: 51.5074,
          longitude: -0.1278,
        },
        device: {
          type: "desktop",
          os: "macOS",
          browser: "Safari",
        },
        ipAddress: "192.168.1.3",
      },
    ],
  },
  {
    originalUrl: "https://example.com/login",
    shortUrl: "ghi789",
    user: "65f1234567890abcdef12347",
    createdAt: "2025-03-21T08:15:00Z",
    clicks: [],
  },
  {
    originalUrl: "https://example.com/blog",
    shortUrl: "jkl012",
    user: "65f1234567890abcdef12348",
    createdAt: "2025-03-20T12:45:00Z",
    clicks: [
      {
        timestamp: "2025-03-22T14:00:00Z",
        location: {
          country: "Canada",
          city: "Toronto",
          latitude: 43.65107,
          longitude: -79.347015,
        },
        device: {
          type: "tablet",
          os: "iOS",
          browser: "Safari",
        },
        ipAddress: "192.168.1.4",
      },
    ],
  },
  {
    originalUrl: "https://example.com/product",
    shortUrl: "mno345",
    user: "65f1234567890abcdef12349",
    createdAt: "2025-03-19T09:20:00Z",
    clicks: [
      {
        timestamp: "2025-03-21T10:30:00Z",
        location: {
          country: "Germany",
          city: "Berlin",
          latitude: 52.52,
          longitude: 13.405,
        },
        device: {
          type: "desktop",
          os: "Linux",
          browser: "Edge",
        },
        ipAddress: "192.168.1.5",
      },
    ],
  },
  {
    originalUrl: "https://example.com/service",
    shortUrl: "pqr678",
    user: "65f1234567890abcdef12350",
    createdAt: "2025-03-18T17:50:00Z",
    clicks: [],
  },
  {
    originalUrl: "https://example.com/about",
    shortUrl: "stu901",
    user: "65f1234567890abcdef12351",
    createdAt: "2025-03-17T11:10:00Z",
    clicks: [
      {
        timestamp: "2025-03-20T09:00:00Z",
        location: {
          country: "France",
          city: "Paris",
          latitude: 48.8566,
          longitude: 2.3522,
        },
        device: {
          type: "mobile",
          os: "iOS",
          browser: "Chrome",
        },
        ipAddress: "192.168.1.6",
      },
    ],
  },
  {
    originalUrl: "https://example.com/contact",
    shortUrl: "vwx234",
    user: "65f1234567890abcdef12352",
    createdAt: "2025-03-16T20:30:00Z",
    clicks: [],
  },
  {
    originalUrl: "https://example.com/help",
    shortUrl: "yz567",
    user: "65f1234567890abcdef12353",
    createdAt: "2025-03-15T14:45:00Z",
    clicks: [
      {
        timestamp: "2025-03-18T08:15:00Z",
        location: {
          country: "Japan",
          city: "Tokyo",
          latitude: 35.6895,
          longitude: 139.6917,
        },
        device: {
          type: "desktop",
          os: "Windows",
          browser: "Firefox",
        },
        ipAddress: "192.168.1.7",
      },
    ],
  },
  {
    originalUrl: "https://example.com/faq",
    shortUrl: "abc789",
    user: "65f1234567890abcdef12354",
    createdAt: "2025-03-14T06:00:00Z",
    clicks: [],
  },
];

export const seedUsers = asyncHandler(async (_req: Request, res: Response) => {
  // delete all users data
  await User.deleteMany({});

  // insert new data
  await User.insertMany(users);

  successResponse(res, {
    statusCode: 200,
    message: "Users seeded successfully",
  });
});

export const seedUrls = asyncHandler(async (_req: Request, res: Response) => {
  // delete all urls data
  await urlModel.deleteMany({});
  // insert new data
  await urlModel.insertMany(urls);

  successResponse(res, {
    statusCode: 200,
    message: "Urls seeded successfully",
  });
});
