import express, { Application, Request, Response } from "express";
import config from "./config";
import mongoose from "./mongoose";
import userService from "./services/user.sevice";
const app: Application = express();

mongoose();

app.get("/", (req: Request, res: Response) => {
  console.log("hello");
});

app.use("/users", userService);

app.listen(config.port || 5000, () => {
  console.log("listen on port 5000");
});
