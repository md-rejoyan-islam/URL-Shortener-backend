import mongoose, { Schema } from "mongoose";
import { qrGeneratorUrl, serverUrl } from "../config/secret";
import { IUrl } from "../types/types";

const urlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: [true, "Original URL is required"],
    },
    shortId: {
      type: String,
      required: [true, "Short ID is required"],
      unique: [true, "Short ID must be unique"],
      minlength: [3, "Short ID must be at least 3 characters long"],
    },
    shortUrl: {
      type: String,
      required: [true, "Short URL is required"],
      unique: [true, "Short URL must be unique"],
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
          type: { type: String },
          os: { type: String },
          browser: { type: String },
        },
        ipAddress: {
          type: String,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// pre save hook to generate qr code url
urlSchema.pre<IUrl>("save", function (next) {
  this.qrCodeUrl = `${qrGeneratorUrl}${serverUrl + "/" + this.shortId}`;
  next();
});

const urlModl = mongoose.model<IUrl>("Url", urlSchema);

export default urlModl;
