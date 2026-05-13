import { z } from "zod";

export const PersonalInfoBaseSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, {
      error: "El nombre debe tener al menos 3 caracteres",
    })
    .max(255, {
      error: "El nombre no debe exceder 255 caracteres",
    }),
  lastName: z
    .string()
    .trim()
    .min(3, {
      error: "El apellido debe tener al menos 3 caracteres",
    })
    .max(255, {
      error: "El apellido no debe exceder 255 caracteres",
    }),
  birthDate: z.coerce
    .date({
      error: "La fecha de nacimiento es inválida",
    })
    .refine((date) => date < new Date(), {
      message: "La fecha de nacimiento no puede ser futura",
    }),
  genderId: z.coerce
    .number({
      error: "El género es obligatorio",
    })
    .min(1, {
      error: "Debes seleccionar un género",
    }),
});

export type PersonalInfoBaseSchemaType = z.infer<typeof PersonalInfoBaseSchema>;
