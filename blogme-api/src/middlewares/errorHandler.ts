import { Request, Response, NextFunction } from "express";

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string ) {
    super(message);
    this.status = status;
    this.message = message;
    console.log(status, " = ", message);
  }
}

export default function (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    console.error("error from error handler =>", err);
    const errorMessage = err.message || "something wrong";
    const errorStatus = err.status || 500;
    // const errorStatus = 500;
    res.status(errorStatus);
    res.json({
      ok: false,
      status: errorStatus,
      error: {
        message: errorMessage,
      },
    });
  }
}
