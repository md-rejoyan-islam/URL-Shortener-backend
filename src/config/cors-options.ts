import dotenv from "dotenv";
dotenv.config();

import { CorsOptions } from "cors";
import { corsWhitelist } from "./secret";

const whitelist = corsWhitelist;

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if ((origin && whitelist.includes(origin)) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

// export the corsOptions object
export default corsOptions;
