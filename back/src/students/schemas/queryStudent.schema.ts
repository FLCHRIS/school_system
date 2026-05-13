import { PaginationSchema } from "@/schemas/pagination/pagination.schema";
import { numberFilterSchema } from "@/utils/numberFilterSchema";
import { z } from "zod";

export const StudentFiltersSchema = z.object({
  guardianId: numberFilterSchema().optional(),
  studentStatusId: numberFilterSchema().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  enrollmentNumber: z.string().optional(),
  statusId: numberFilterSchema().optional(),
  email: z.string().optional(),
  genderId: numberFilterSchema().optional(),
});

export const QueryStudentSchema = StudentFiltersSchema.extend(
  PaginationSchema.shape
);

export type StudentFiltersSchemaType = z.infer<typeof StudentFiltersSchema>;
export type QueryStudentSchemaType = z.infer<typeof QueryStudentSchema>;
