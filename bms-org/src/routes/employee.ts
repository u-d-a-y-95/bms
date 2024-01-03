import express, { Router } from "express";
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployee,
  getEmployeeById,
  resetEmployeePassword,
  updateEmployeeById,
  updateEmployeePassword,
} from "../controllers/employee";
import { validate } from "../middlewares/validator";
import {
  createEmployeeSchema,
  updateEmployeePasswordSchema,
  updateEmployeeSchema,
} from "../dtos/employee";

export const employeeRouter: Router = express.Router();

employeeRouter.get("/:id", getEmployeeById);
employeeRouter.delete("/:id", deleteEmployeeById);
employeeRouter.put("/:id", validate(updateEmployeeSchema), updateEmployeeById);

employeeRouter.patch(
  "/:id/password",
  validate(updateEmployeePasswordSchema),
  updateEmployeePassword
);
employeeRouter.patch("/:id/reset-password", resetEmployeePassword);

employeeRouter.post("/", validate(createEmployeeSchema), createEmployee);
employeeRouter.get("/", getAllEmployee);
