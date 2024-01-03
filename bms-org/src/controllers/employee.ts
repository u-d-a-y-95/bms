import { Request, Response, NextFunction, query } from "express";
import { Employee } from "../services/employee";
import { HttpResponse } from "../utils/httpResponse";
import { HttpStatus } from "../const/httpStatus";
import { gethashed } from "../utils/bcrypt";
import { HttpException } from "../utils/httpException";
import { Prisma } from "@prisma/client";
import { compareHash } from "../utils/bcrypt";
import {
  addUserData,
  deleteUserData,
  updateUserData,
} from "../services/mq/publish/employee";
import { prisma } from "../db";

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.user;
    const { body } = req;
    const employee = new Employee();
    const randomPassword = employee.getRandomPassword();
    console.log("random password :", randomPassword);
    const hashedPassword = await gethashed(randomPassword);
    const { password, ...newEmployee } = await employee.create({
      ...body,
      companyId,
      status: "ACTIVE",
      password: hashedPassword,
    });
    //
    addUserData({
      password,
      ...newEmployee,
    });
    const resposne = new HttpResponse(
      HttpStatus.CREATED,
      "Employee is created successfully ",
      newEmployee
    );

    res.status(200).json(resposne);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        next(
          new HttpException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "This mobile is already resgitered",
            null
          )
        );
    }
    next(error);
  }
};

export const getAllEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.user;
    const { search = "", status = "", limit = 10, offset = 0 } = req.query;
    const result = await prisma.$transaction(async (tx) => {
      const filterArg = {
        status,
        search,
        companyId,
        limit,
        offset,
      };
      const employeeServcie = new Employee(tx);
      const total = await employeeServcie.getAllCount(filterArg);
      const employees = await employeeServcie.getAll(filterArg);
      return {
        total,
        employees,
      };
    });
    const resposne = new HttpResponse(HttpStatus.OK, "", result);
    res.status(200).json(resposne);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const employee = new Employee();
    const result = await employee.getById(id);
    if (!result)
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Employee is not found",
        result
      );
    const { password, ...rest } = result;
    const resposne = new HttpResponse(HttpStatus.OK, "employee", rest);
    res.status(HttpStatus.OK).json(resposne);
  } catch (error) {
    next(error);
  }
};
export const deleteEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const employee = new Employee();
    const result = await employee.deleteById(id);
    const { password, ...rest } = result;
    const resposne = new HttpResponse(
      HttpStatus.OK,
      "Employee is deleted successfully",
      rest
    );

    deleteUserData({ id });
    res.status(HttpStatus.OK).json(resposne);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025")
        next(
          new HttpException(HttpStatus.NOT_FOUND, "Employee is not found", null)
        );
    }
    next(error);
  }
};

export const updateEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const employee = new Employee();
    const result = await employee.updateById(id, body);
    const { password, ...rest } = result;
    const resposne = new HttpResponse(
      HttpStatus.OK,
      "Employee is updated successfully",
      rest
    );
    updateUserData({
      id,
      data: {
        name: rest.name,
        status: rest.status,
        mobile: rest.mobile,
        role: rest.role,
      },
    });
    res.status(HttpStatus.OK).json(resposne);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025")
        next(
          new HttpException(HttpStatus.NOT_FOUND, "Employee is not found", null)
        );
    }
    next(error);
  }
};

export const updateEmployeePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      body: { oldPassword, newPassword },
    } = req;
    const employee = new Employee();
    const result = await employee.getById(id);
    if (!result)
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Employee is not found",
        result
      );
    const { password, ...rest } = result;
    const isPasswordMatch = await compareHash(oldPassword, password);
    if (!isPasswordMatch)
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        "Old password is not correct",
        null
      );
    const hashedPassword = await gethashed(newPassword);
    const udpatedEmployee = await employee.updateById(id, {
      password: hashedPassword,
    });
    const resposne = new HttpResponse(
      HttpStatus.OK,
      "Employee's password is updated successfully",
      null
    );
    updateUserData({
      id,
      data: {
        password: hashedPassword,
      },
    });
    res.status(HttpStatus.OK).json(resposne);
  } catch (error) {
    next(error);
  }
};
export const resetEmployeePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const employee = new Employee();
    const result = await employee.getById(id);
    if (!result)
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Employee is not found",
        result
      );
    const randomPassword = employee.getRandomPassword();
    console.log(randomPassword);
    const hashedPassword = await gethashed(randomPassword);
    const udpatedEmployee = await employee.updateById(id, {
      password: hashedPassword,
    });
    updateUserData({
      id,
      data: {
        password: hashedPassword,
      },
    });
    const { password, ...restUpdateEmployee } = udpatedEmployee;
    const resposne = new HttpResponse(
      HttpStatus.OK,
      "Employee's password is reset successfully",
      restUpdateEmployee
    );

    res.status(HttpStatus.OK).json(resposne);
  } catch (error) {
    next(error);
  }
};
