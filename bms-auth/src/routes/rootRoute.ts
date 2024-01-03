import express, { Router } from "express";
import { login, tokenValidate } from "../controllers/auth";
import { validate } from "../middlewares/validator";
import { loginSchema } from "../schemas/auth";

export const rootRouter: Router = express.Router();

rootRouter.post("/login", validate(loginSchema), login);
rootRouter.get("/validate", tokenValidate);
