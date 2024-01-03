import { NextFunction, Response, Request } from "express";
import { HttpException } from "../utils/httpException";
import { HttpResponse } from "../utils/httpResponse";

export const mainErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    const response = new HttpResponse(err.status, err.message, err.data);
    res.status(response.status).json(response);
  }
};
