import { StudentDocumentFiltersSchemaType } from "@/students/schemas/queryStudentDocument.schema";
import { Prisma } from "@prisma/client";

export const buildStudentDocumentFilter = (
  schema: StudentDocumentFiltersSchemaType
) => {
  const filter: Prisma.CatalogItemWhereInput = {};

  if (schema.documentTypeId?.length) {
    filter.catalogItemId = {
      in: schema.documentTypeId,
    };
  }

  return filter;
};
