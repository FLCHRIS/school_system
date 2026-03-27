import { CatalogFiltersSchemaType } from "@/catalogs/schemas/queryCatalog.schema";
import { Prisma } from "prisma/prisma-client";

export const buildCatalogFilter = (
  schema: CatalogFiltersSchemaType
): Prisma.CatalogWhereInput => {
  const filter: Prisma.CatalogWhereInput = {};

  if (schema.catalogId) filter.catalogId = schema.catalogId;
  if (schema.type) filter.type = schema.type;

  return filter;
};
