import { ValidationError } from "@/types/error.types";
import { HttpError } from "@/errors/http.error";
import { ZodType, ZodError } from "zod";

export const validateSchema = <T>(schema: ZodType<T>, data: unknown) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: ValidationError[] = error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      throw new HttpError(400, "Datos inválidos", undefined, errors);
    }

    throw error;
  }
};
