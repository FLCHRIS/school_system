import { StudentDocumentFiltersSchemaType } from "@/students/schemas/queryStudentDocument.schema";
import { Prisma } from "@prisma/client";

export const buildStudentDocumentFilter = (
  schema: StudentDocumentFiltersSchemaType
) => {
  const filter: Prisma.CatalogItemWhereInput = {};

  if (schema.catalogItemId?.length) {
    filter.catalogItemId = {
      in: schema.catalogItemId,
    };
  }

  return filter;
};
