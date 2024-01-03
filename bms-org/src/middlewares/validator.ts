import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { HttpException } from "../utils/httpException";
import { HttpStatus } from "../const/httpStatus";

export const validate = (schema: ZodSchema) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const data = await schema.parseAsync(body);
      req.body = data;
      next();
    } catch (error: any) {
      const errors = error.errors.map((error: any) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      next(new HttpException(HttpStatus.BAD_REQUEST, "Bad request", errors));
    }
  };
};
