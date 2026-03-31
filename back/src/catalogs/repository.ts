import { CreateCatalogSchemaType } from "@/catalogs/schemas/createCatalog.schema";
import { UpdateCatalogSchemaType } from "@/catalogs/schemas/updateCatalog.schema";
import { catalogSelectAll } from "@/catalogs/queries/catalogSelect";
import { prisma } from "@/config/prisma";
import { Prisma } from "@prisma/client";

export const getCatalogs = async (
  filter: Prisma.CatalogWhereInput,
  skip: number,
  take: number
) => {
  const [data, total] = await Promise.all([
    prisma.catalog.findMany({
      take,
      skip,
      where: filter,
      select: catalogSelectAll,
    }),
    prisma.catalog.count({ where: filter }),
  ]);

  return { data, total };
};

export const getCatalog = async (catalogId: number) => {
  return await prisma.catalog.findUnique({
    where: { catalogId },
  });
};

export const getCatalogItems = async (catalogId: number) => {
  return await prisma.catalogItem.findMany({
    where: {
      catalogId,
      isActive: true,
    },
    select: {
      catalogItemId: true,
      name: true,
    },
  });
};

export const getCatalogItem = async (
  catalogId: number,
  catalogItemId: number
) => {
  return await prisma.catalogItem.findFirst({
    where: { catalogItemId, catalogId },
    select: {
      catalogItemId: true,
      name: true,
    },
  });
};

export const createCatalogItem = async (
  catalogId: number,
  data: CreateCatalogSchemaType
) => {
  await prisma.catalogItem.create({ data: { catalogId, ...data } });
};

export const updateCatalogItem = async (
  catalogItemId: number,
  data: UpdateCatalogSchemaType
) => {
  await prisma.catalogItem.update({
    where: { catalogItemId },
    data,
  });
};

export const deleteCatalogItem = async (catalogItemId: number) => {
  await prisma.catalogItem.delete({
    where: { catalogItemId },
  });
};

export const inactivateCatalogItem = async (catalogItemId: number) => {
  await prisma.catalogItem.update({
    where: { catalogItemId },
    data: { isActive: false },
  });
};
