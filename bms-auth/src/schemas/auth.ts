import { z } from "zod";

export const loginSchema = z.object({
  mobile: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/),
  password: z.string().nonempty().min(5, "At least 5 charecter needs"),
});
