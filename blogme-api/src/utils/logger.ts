import { HttpException } from "../middlewares/errorHandler";

export function errorLog(
  status: number,
  error: string,
  responseMessage?: string
) {
  console.error("error log => ", error);
  throw new HttpException(
    status || 500,
    responseMessage || error || "something wrong"
  );
}
