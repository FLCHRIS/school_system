import { PaginationSchema } from "@/schemas/pagination/pagination.schema";
import { numberFilterSchema } from "@/utils/numberFilterSchema.util";
import { z } from "zod";

export const GuardianFiltersSchema = z.object({
  email: z.string().optional(),
  statusId: numberFilterSchema().optional(),
  genderId: numberFilterSchema().optional(),
});

export const QueryGuardianSchema = GuardianFiltersSchema.extend(
  PaginationSchema.shape
);

export type GuardianFiltersSchemaType = z.infer<typeof GuardianFiltersSchema>;
export type QueryGuardianSchemaType = z.infer<typeof QueryGuardianSchema>;
