import { CreateGuardianSchemaType } from "@/guardian/schemas/createGuardian.schema";
import { guardianSelectAll } from "@/guardian/queries/guardianSelect";
import { USER_ROLES, USER_STATUS } from "@/constants";
import { prisma } from "@/config/prisma";

export const getGuardian = async (guardianId: number) => {
  return await prisma.guardian.findUnique({
    where: { guardianId },
    select: guardianSelectAll,
  });
};

export const createGuardian = async (data: CreateGuardianSchemaType) => {
  return await prisma.guardian.create({
    data: {
      user: {
        create: {
          role: { connect: { catalogItemId: USER_ROLES.GUARDIAN } },
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
    },
  });
};
