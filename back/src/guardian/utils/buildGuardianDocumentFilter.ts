import { GuardianDocumentFiltersSchemaType } from "@/guardian/schemas/queryGuardianDocument.schema";
import { Prisma } from "@prisma/client";

export const buildGuardianDocumentFilter = (
  schema: GuardianDocumentFiltersSchemaType
) => {
  const filter: Prisma.CatalogItemWhereInput = {};

  if (schema.documentTypeId?.length) {
    filter.catalogItemId = {
      in: schema.documentTypeId,
    };
  }

  return filter;
};
