import { z } from "zod";

export const updateCompanySchema = z
  .object({
    name: z.string().nonempty().optional(),
    email: z.string().email().optional(),
    mobile: z.string().optional(),
    address: z.string().optional(),
    logo: z.string().optional(),
  })
  .transform((obj) => obj);
