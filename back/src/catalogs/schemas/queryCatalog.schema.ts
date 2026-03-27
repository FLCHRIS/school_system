import { PaginationSchema } from "@/schemas/pagination.schema";
import { z } from "zod";

const CATALOG_TYPES = {
  SYSTEM: "S",
  USER: "U",
} as const;

export const CatalogFiltersSchema = z.object({
  catalogId: z.coerce.number().optional(),
  type: z.enum([CATALOG_TYPES.SYSTEM, CATALOG_TYPES.USER]).optional(),
});

export const QueryCatalogSchema = CatalogFiltersSchema.extend(
  PaginationSchema.shape
);

export type CatalogFiltersSchemaType = z.infer<typeof CatalogFiltersSchema>;
export type QueryCatalogSchemaType = z.infer<typeof QueryCatalogSchema>;
