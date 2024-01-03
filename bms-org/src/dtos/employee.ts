import { object, z } from "zod";

export const createEmployeeSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email().optional(),
    mobile: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/),
    password: z.string().optional(),
    avater: z.string().optional(),
    address: z.string().optional(),
  })
  .transform((obj) => obj);

export const updateEmployeeSchema = z
  .object({
    name: z.string().nonempty().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  })
  .transform((obj) => obj);

export const updateEmployeePasswordSchema = z
  .object({
    oldPassword: z.string().nonempty(),
    newPassword: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  })
  .transform((obj) => {
    const { confirmPassword, ...rest } = obj;
    return rest;
  });
