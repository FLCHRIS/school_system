import { PaginationSchema } from "@/schemas/pagination/pagination.schema";
import { numberFilterSchema } from "@/utils/numberFilterSchema.util";
import { z } from "zod";

export const GuardianDocumentFiltersSchema = z.object({
  documentTypeId: numberFilterSchema().optional(),
});

export const QueryGuardianDocumentSchema = GuardianDocumentFiltersSchema.extend(
  PaginationSchema.shape
);

export type GuardianDocumentFiltersSchemaType = z.infer<
  typeof GuardianDocumentFiltersSchema
>;
export type QueryGuardianDocumentSchemaType = z.infer<
  typeof QueryGuardianDocumentSchema
>;
