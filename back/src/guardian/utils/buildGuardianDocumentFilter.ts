import { GuardianDocumentFiltersSchemaType } from "@/guardian/schemas/queryGuardianDocument.schema";
import { Prisma } from "@prisma/client";

export const buildGuardianDocumentFilter = (
  schema: GuardianDocumentFiltersSchemaType
) => {
  const filter: Prisma.CatalogItemWhereInput = {};

  if (schema.catalogItemId?.length) {
    filter.catalogItemId = {
      in: schema.catalogItemId,
    };
  }

  return filter;
};
