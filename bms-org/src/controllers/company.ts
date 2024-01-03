import { NextFunction, Request, Response } from "express";
import { Company } from "../services/company";
import { HttpStatus } from "../const/httpStatus";
import { HttpResponse } from "../utils/httpResponse";
import { HttpException } from "../utils/httpException";
import { Prisma } from "@prisma/client";
import { string } from "zod";

export const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const companyService = new Company();
    const company = await companyService.getById(id);
    if (!company)
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Company is not found",
        null
      );
    const response = new HttpResponse(HttpStatus.OK, "", company);
    res.status(HttpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};
export const getCompanyBytoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.user;
    const companyService = new Company();
    const company = await companyService.getById(companyId);
    if (!company)
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Company is not found",
        null
      );
    const response = new HttpResponse(HttpStatus.OK, "", company);
    res.status(HttpStatus.OK).json(response);
  } catch (error) {
    next(error);
  }
};
const updateCompany = async (
  companyId: string,
  body: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyService = new Company();
    const company = await companyService.updateById(companyId, body);
    const response = new HttpResponse(
      HttpStatus.OK,
      "Company is updated successfully",
      company
    );
    res.status(HttpStatus.OK).json(response);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025")
        next(
          new HttpException(HttpStatus.NOT_FOUND, "Company is not found", null)
        );
    }
    next(error);
  }
};
export const updateCompanyBytoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyId } = req.user;
  const { body } = req;
  updateCompany(companyId, body, res, next);
};

export const updateCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { body } = req;
  updateCompany(id, body, res, next);
};
