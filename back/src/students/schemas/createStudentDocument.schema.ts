import { z } from "zod";

export const CreateStudentDocumentSchema = z.object({
  catalogItemId: z.coerce
    .number({
      error: "El tipo de documento es obligatorio",
    })
    .min(1, {
      error: "Debes seleccionar un tipo de documento",
    }),
});

export type CreateStudentDocumentSchemaType = z.infer<
  typeof CreateStudentDocumentSchema
>;
