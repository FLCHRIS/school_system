import { CreateGuardianSchemaType } from "@/guardian/schemas/createGuardian.schema";
import { existsGuardianQuery } from "@/guardian/queries/existsGuardian";
import { searchGuardianQuery } from "@/guardian/queries/searchGuardian";
import { USER_ROLES, USER_STATUS } from "@/constants";
import { prisma } from "@/config/prisma";
import { Prisma } from "@prisma/client";

export const getGuardians = async (
  filter: Prisma.GuardianWhereInput[],
  skip: number,
  take: number
) => {
  const [data, total] = await Promise.all([
    prisma.guardian.findMany({
      take,
      skip,
      where: { AND: filter },
      select: searchGuardianQuery,
    }),
    prisma.guardian.count({ where: { AND: filter } }),
  ]);

  return { data, total };
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

export const existsGuardian = async (guardianId: number) => {
  return await prisma.guardian.findUnique({
    where: { guardianId },
    select: existsGuardianQuery,
  });
};
