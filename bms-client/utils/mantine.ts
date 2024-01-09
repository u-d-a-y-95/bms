import { z } from "zod";

export const mantineValidate = (values: any, schema: z.Schema) => {
  const result = schema.safeParse(values);
  if (!result.success) {
    return JSON.parse(result.error.toString())?.reduce(
      (acc: any, item: any) => {
        acc[item.path[0]] = item.message;
        return acc;
      },
      {}
    );
  }
  return {};
};
