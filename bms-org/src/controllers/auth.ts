import { NextFunction, Request, Response } from "express";
import { Company } from "../services/company";
import { Employee } from "../services/employee";
import { gethashed } from "../utils/bcrypt";
import { prisma } from "../db";
import { HttpException } from "../utils/httpException";
import { HttpStatus } from "../const/httpStatus";
import { HttpResponse } from "../utils/httpResponse";
import { addUserData } from "../services/mq/publish/employee";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company, employee } = req.body;
    const result = await prisma.$transaction(async (tx) => {
      const companyObj = new Company(tx);
      const employeeObj = new Employee(tx);
      const newCompany = await companyObj.create(company);
      employee["companyId"] = newCompany.id;
      employee["role"] = "OWNER";
      employee["password"] = await gethashed(employee.password);
      const newEmployee = await employeeObj.create(employee);
      return newEmployee;
    });
    addUserData(result);
    const { password, ...rest } = result;
    res
      .status(201)
      .json(
        new HttpResponse(HttpStatus.CREATED, "Sign up is successfully", rest)
      );
  } catch (error) {
    next(
      new HttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Internal server error",
        null
      )
    );
  }
};
