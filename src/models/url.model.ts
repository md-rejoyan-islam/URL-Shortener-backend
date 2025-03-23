import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
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

export default mongoose.model("Url", urlSchema);
