import { z } from "zod";

export const UpdateGuardianDocumentSchema = z.object({
  catalogItemId: z.coerce
    .number({
      error: "El tipo de documento es obligatorio",
    })
    .min(1, {
      error: "Debes seleccionar un tipo de documento",
    }),
});

export type UpdateGuardianDocumentSchemaType = z.infer<
  typeof UpdateGuardianDocumentSchema
>;
