import { CreateCatalogSchemaType } from "@/catalogs/schemas/createCatalog.schema";
import { DecodedToken } from "@/types/auth.types";
import { catalogSelectAll } from "@/catalogs/queries/catalogSelect";
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
  const catalogExists = await prisma.catalog.findUnique({
    where: { catalogId },
  });

  if (!catalogExists) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "${catalogId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }

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
  const catalogExists = await prisma.catalog.findUnique({
    where: { catalogId: schema.catalogId },
  });

  if (!catalogExists) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "${schema.catalogId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }

  await prisma.catalogItem.create({
    data: {
      catalogId: schema.catalogId,
      name: schema.name,
    },
  });

  logger.info(
    `[CATALOG] Catálogo creado - "${schema.name}" por el usuario "${user.username}"`
  );
};
