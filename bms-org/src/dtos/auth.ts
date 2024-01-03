import { z } from "zod";

export const signupSchema = z.object({
  company: z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
  }),
  employee: z.object({
    name: z.string().nonempty(),
    mobile: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/),
    password: z.string().nonempty({ message: "Password can't be empty" }),
  }),
});
