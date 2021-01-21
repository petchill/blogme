import "express-async-errors"
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import compress from "compression";
import config from "./config";
import mongoose from "./mongoose";
import ServiceRouter from "./serviceRouter";
import errorHandler from "./middlewares/errorHandler";
import userModel from "./models/user.model";

const app: Application = express();

mongoose();

app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/test", async (req, res) => {
  // throw new Error("wrong 1");
  try {
    const response = await userModel.find();
    console.log("response => ", response);
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});
app.use("/", new ServiceRouter().router);

app.use(errorHandler);

app.listen(config.port || 5000, () => {
  console.log("listen on port 5000");
});

process.on("uncaughtException", function (err) {
  // handle the error safely
  console.log("error js => ", err);
  process.exit(1);
});

export default app;
