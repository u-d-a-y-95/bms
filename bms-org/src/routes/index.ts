import express, { Router } from "express";
import { companyRouter } from "./company";
import { employeeRouter } from "./employee";

export const rootRouter: Router = express.Router();

// company routes
rootRouter.use("/companies", companyRouter);
rootRouter.use("/employees", employeeRouter);
