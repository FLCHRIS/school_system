import { StudentFiltersSchemaType } from "@/students/schemas/queryStudent.schema";
import { Prisma } from "@prisma/client";

export const buildStudentFilter = (schema: StudentFiltersSchemaType) => {
  const filter: Prisma.StudentWhereInput[] = [];

  if (schema.guardianId?.length) {
    filter.push({
      guardianId: { in: schema.guardianId },
    });
  }
  if (schema.studentStatusId?.length) {
    filter.push({
      studentStatusId: { in: schema.studentStatusId },
    });
  }
  if (schema.enrollmentNumber) {
    filter.push({
      enrollmentNumber: {
        contains: schema.enrollmentNumber,
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
