import express, { Router } from "express";
import {
  getCompanyById,
  getCompanyBytoken,
  updateCompanyBytoken,
  updateCompanyById,
} from "../controllers/company";
import { validate } from "../middlewares/validator";
import { updateCompanySchema } from "../dtos/company";

export const companyRouter: Router = express.Router();

companyRouter.get("/self", getCompanyBytoken);
companyRouter.put("/self", validate(updateCompanySchema), updateCompanyBytoken);
companyRouter.put("/:id", validate(updateCompanySchema), updateCompanyById);
companyRouter.get("/:id", getCompanyById);
