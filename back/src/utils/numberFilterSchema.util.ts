import { z } from "zod";

export const numberFilterSchema = (message: string = "") => {
  return z
    .union([
      z.coerce.number({
        error: message,
      }),
      z.array(
        z.coerce.number({
          error: message,
        })
      ),
    ])
    .transform((value) => (Array.isArray(value) ? value : [value]));
};
