import { CreateCatalogSchemaType } from "@/catalogs/schemas/createCatalog.schema";
import { UpdateCatalogSchemaType } from "@/catalogs/schemas/updateCatalog.schema";
import { catalogSelectAll } from "@/catalogs/queries/catalogSelect";
import { DecodedToken } from "@/types/auth.types";
import { HttpError } from "@/errors/http.error";
import { Prisma } from "prisma/prisma-client";
import { logger } from "@/config/logger";
import { prisma } from "@/config/prisma";

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

  logger.info(`[CATALOG] Catálogos obtenidos - "${total}"`);

  return { data, total };
};

export const getCatalog = async (catalogId: number) => {
  await catalogExists(catalogId);

  const data = await prisma.catalogItem.findMany({
    where: {
      catalogId,
      isActive: true,
    },
    select: {
      catalogItemId: true,
      name: true,
    },
  });

  logger.info(`[CATALOG] Catálogo obtenido - "${catalogId}"`);

  return data;
};

export const createCatalog = async (
  schema: CreateCatalogSchemaType,
  user: DecodedToken
) => {
  await catalogExists(schema.catalogId);

  await prisma.catalogItem.create({
    data: schema,
  });

  logger.info(
    `[CATALOG] Catálogo creado - "${schema.name}" por el usuario "${user.username}"`
  );
};

export const updateCatalog = async (
  catalogItemId: number,
  schema: UpdateCatalogSchemaType,
  user: DecodedToken
) => {
  await catalogItemExists(catalogItemId);

  await prisma.catalogItem.update({
    where: { catalogItemId },
    data: schema,
  });

  logger.info(
    `[CATALOG] Catálogo actualizado - "${schema.name}" por el usuario "${user.username}"`
  );
};

const catalogExists = async (catalogId: number) => {
  const exists = await prisma.catalog.findUnique({
    where: { catalogId },
  });

  if (!exists) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "${catalogId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }
};

const catalogItemExists = async (catalogItemId: number) => {
  const exists = await prisma.catalogItem.findUnique({
    where: { catalogItemId },
  });

  if (!exists) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "${catalogItemId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }
};
