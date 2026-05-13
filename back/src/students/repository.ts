import { StudentWithExistingGuardianSchemaType } from "@/students/schemas/createStudent.schema";
import { STUDENT_STATUS } from "@/students/constants";
import { USER_ROLES, USER_STATUS } from "@/constants";
import { prisma } from "@/config/prisma";

export const createStudent = async (
  data: StudentWithExistingGuardianSchemaType
) => {
  return await prisma.student.create({
    data: {
      status: { connect: { catalogItemId: STUDENT_STATUS.PENDING } },
      user: {
        create: {
          role: { connect: { catalogItemId: USER_ROLES.STUDENT } },
          status: { connect: { catalogItemId: USER_STATUS.ACTIVE } },
          personalInfo: {
            create: {
              firstName: data.user.personalInfo.firstName,
              lastName: data.user.personalInfo.lastName,
              birthDate: data.user.personalInfo.birthDate,
              gender: {
                connect: { catalogItemId: data.user.personalInfo.genderId },
              },
            },
          },
          contactInfo: {
            create: {
              email: data.user.contactInfo.email,
              phone: data.user.contactInfo.phone,
            },
          },
        },
      },
      address: {
        create: {
          street: data.address.street,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          reference: data.address.reference ?? null,
        },
      },
      guardian: {
        connect: { guardianId: data.guardianId },
      },
    },
  });
};

export const setEnrollmentNumber = async (
  studentId: number,
  enrollmentNumber: string
) => {
  await prisma.student.update({
    where: { studentId },
    data: { enrollmentNumber },
  });
};
