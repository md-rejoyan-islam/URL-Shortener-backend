import mongoose from "mongoose";
import { serverUrl } from "../config/secret";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    qrCodeUrl: {
      type: String,
    },
    clicks: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        location: {
          country: { type: String },
          city: { type: String },
          latitude: { type: Number },
          longitude: { type: Number },
        },
        device: {
          type: { type: String }, // mobile, desktop, tablet
          os: { type: String },
          browser: { type: String },
        },
        ipAddress: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// pre save hook to generate qr code url
urlSchema.pre("save", function (next) {
  this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
    serverUrl + "/" + this.shortId
  }`;
  next();
});

export default mongoose.model("Url", urlSchema);
