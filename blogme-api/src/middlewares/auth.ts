import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorLog } from "../utils/logger";
import config from "../config";
import { Mongoose, Schema } from "mongoose";

export interface IUserToken { 
  _id: Schema.Types.ObjectId;
  email: string;
}

interface IJwt {
  user: IUserToken
  iat: number;
  exp: number;
  aud: string;
}

const jwtConfig = config.jwt;

function getAccessToken(authHeader: string) {
  const authHeaderSplit = authHeader.split(" ");
  const accessToken = authHeaderSplit[1];
  return accessToken;
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401);
    res.json({
      ok: false,
      status: 401,
      error: {
        message: "authorization header is required",
      },
    });
  }
  const accessToken = getAccessToken(authHeader);
  let jwtData: any;
  try {
    jwtData = jwt.verify(accessToken, jwtConfig.secret);
  } catch (error) {
    console.error("jwt error => ", error);
    res.status(401);
    res.json({
      ok: false,
      status: 401,
      error: error,
    });
  }
  const userData: IUserToken = jwtData.user;
  if (!userData) errorLog(401, "Not authentication");
  req.user = userData;
  next();
}
