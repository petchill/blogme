import mongoose from "mongoose";
import config from "./config";

export default async () => {
  const mongoConfig = config.mongodb;
        const mongoUrl = mongoConfig.url
        const mongoOptions = mongoConfig.options
        try {
          await mongoose.connect(mongoUrl, mongoOptions);
        } catch (error) {
          console.error('connect mongo fail', error);
          // errorLog(500, error, "connect to mongoDB fail!!");
        }
};
