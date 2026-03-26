import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { error: "El nombre de usuario debe ser mayor a 5 caracteres" })
    .max(15, { error: "El nombre de usuario debe ser menor a 15 caracteres" }),
  password: z
    .string()
    .trim()
    .min(5, { error: "La contraseña debe ser mayor a 5 caracteres" })
    .max(15, { error: "La contraseña debe ser menor a 15 caracteres" }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
