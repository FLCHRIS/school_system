import { z } from "zod";

export const CreateCatalogSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { error: "El nombre debe ser mayor a 3 caracteres" })
    .max(255, { error: "El nombre debe ser menor a 255 caracteres" }),
});

export type CreateCatalogSchemaType = z.infer<typeof CreateCatalogSchema>;
