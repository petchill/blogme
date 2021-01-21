import mongoose from "mongoose";
import config from "./config";
import { errorLog } from "./utils/logger";

export default async () => {
  const mongoConfig = config.mongodb;
  const mongoUrl = mongoConfig.url;
  const mongoOptions = mongoConfig.options;
  try {
    await mongoose.connect(mongoUrl, mongoOptions);
  } catch (error) {
    errorLog(500, error, "connecting to mongoDB is fail");
  }
};
