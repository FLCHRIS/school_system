import { GuardianFiltersSchemaType } from "@/guardian/schemas/queryGuardian.schema";
import { Prisma } from "@prisma/client";

export const buildGuardianFilter = (schema: GuardianFiltersSchemaType) => {
  const filter: Prisma.GuardianWhereInput[] = [];

  if (schema.email) {
    filter.push({
      user: {
        is: {
          contactInfo: {
            is: {
              email: {
                contains: schema.email,
              },
            },
          },
        },
      },
    });
  }
  if (schema.statusId?.length) {
    filter.push({
      user: {
        is: {
          statusId: {
            in: schema.statusId,
          },
        },
      },
    });
  }
  if (schema.genderId?.length) {
    filter.push({
      user: {
        is: {
          personalInfo: {
            is: {
              genderId: {
                in: schema.genderId,
              },
            },
          },
        },
      },
    });
  }

  return filter;
};
