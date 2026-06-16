import { PaginationSchema } from "@/schemas/pagination/pagination.schema";
import { numberFilterSchema } from "@/utils/numberFilterSchema";
import { z } from "zod";

export const StudentDocumentFiltersSchema = z.object({
  documentTypeId: numberFilterSchema().optional(),
});

export const QueryStudentDocumentSchema = StudentDocumentFiltersSchema.extend(
  PaginationSchema.shape
);

export type StudentDocumentFiltersSchemaType = z.infer<
  typeof StudentDocumentFiltersSchema
>;
export type QueryStudentDocumentSchemaType = z.infer<
  typeof QueryStudentDocumentSchema
>;
