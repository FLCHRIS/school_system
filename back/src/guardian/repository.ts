import { searchGuardianDocumentQuery } from "@/guardian/queries/searchGuardianDocument";
import { existsGuardianDocumentQuery } from "@/guardian/queries/existsGuardianDocument";
import { CreateGuardianSchemaType } from "@/guardian/schemas/createGuardian.schema";
import { UpdateGuardianSchemaType } from "@/guardian/schemas/updateGuardian.schema";
import { existsGuardianQuery } from "@/guardian/queries/existsGuardian";
import { searchGuardianQuery } from "@/guardian/queries/searchGuardian";
import { USER_ROLES, USER_STATUS, CATALOGS } from "@/constants";
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

export const getGuardian = async (guardianId: number) => {
  return await prisma.guardian.findUnique({
    where: { guardianId },
    select: searchGuardianQuery,
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

export const updateGuardian = async (
  data: UpdateGuardianSchemaType,
  guardianId: number
) => {
  return await prisma.guardian.update({
    where: { guardianId },
    data: {
      user: {
        update: {
          personalInfo: {
            update: {
              firstName: data.user.personalInfo.firstName,
              lastName: data.user.personalInfo.lastName,
              birthDate: data.user.personalInfo.birthDate,
              gender: {
                connect: { catalogItemId: data.user.personalInfo.genderId },
              },
            },
          },
          contactInfo: {
            update: {
              email: data.user.contactInfo.email,
              phone: data.user.contactInfo.phone,
            },
          },
        },
      },
      address: {
        update: {
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

export const getGuardianDocuments = async (
  guardianId: number,
  filter: Prisma.CatalogItemWhereInput,
  skip: number,
  take: number
) => {
  const where: Prisma.CatalogItemWhereInput = {
    catalogId: CATALOGS.GUARDIAN_DOCUMENT_TYPES,
    isActive: true,
    ...filter,
  };

  const [data, total] = await Promise.all([
    prisma.catalogItem.findMany({
      take,
      skip,
      where,
      select: searchGuardianDocumentQuery(guardianId),
    }),
    prisma.catalogItem.count({ where }),
  ]);

  return { data, total };
};

export const createGuardianDocument = async (
  documentTypeId: number,
  guardianId: number,
  publicId: string,
  url: string
) => {
  return await prisma.guardianDocument.create({
    data: {
      publicId,
      url,
      guardian: { connect: { guardianId } },
      type: { connect: { catalogItemId: documentTypeId } },
    },
  });
};

export const updateGuardianDocument = async (
  guardianDocumentId: number,
  publicId: string,
  url: string
) => {
  return await prisma.guardianDocument.update({
    where: { guardianDocumentId },
    data: { publicId, url },
  });
};

export const existsGuardianDocument = async (
  guardianDocumentId: number,
  guardianId: number
) => {
  return await prisma.guardianDocument.findFirst({
    where: { guardianDocumentId, guardianId },
    select: existsGuardianDocumentQuery,
  });
};

export const existsGuardianDocumentByType = async (
  guardianId: number,
  documentTypeId: number
) => {
  return await prisma.guardianDocument.findFirst({
    where: { guardianId, documentTypeId },
    select: existsGuardianDocumentQuery,
  });
};
