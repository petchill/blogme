import "express-async-errors"
import "./IGlobal"
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import compress from "compression";
import config from "./config";
import mongoose from "./mongoose";
import ServiceRouter from "./serviceRouter";
import errorHandler from "./middlewares/errorHandler";
import userModel from "./models/user.model";
// import { Schema } from "mongoose";
// interface IUserToken { 
//   _id: Schema.Types.ObjectId;
//   email: string;
// }
// declare global{
//   namespace Express {
//    export interface Request {
//       user: IUserToken
//    }
//  }
// }
const app: Application = express();

const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log("listen on port ", port);
});

process.on("uncaughtException", function (err) {
  // handle the error safely
  console.log("error js => ", err);
  process.exit(1);
});

export default app;
