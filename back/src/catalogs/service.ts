import { CreateCatalogSchemaType } from "@/catalogs/schemas/createCatalog.schema";
import { UpdateCatalogSchemaType } from "@/catalogs/schemas/updateCatalog.schema";
import { isForeignKeyError } from "@/errors/prisma.error";
import * as repository from "@/catalogs/repository";
import { DecodedToken } from "@/types/auth.types";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";
import { Prisma } from "@prisma/client";

export const getCatalogs = async (
  filter: Prisma.CatalogWhereInput,
  skip: number,
  take: number
) => {
  const data = await repository.getCatalogs(filter, skip, take);

  logger.info(`[CATALOG] Catálogos obtenidos - "${data.total}"`);

  return data;
};

export const getCatalogItems = async (catalogId: number) => {
  await catalogExists(catalogId);

  const data = await repository.getCatalogItems(catalogId);

  logger.info(`[CATALOG] Catálogo obtenido - "${catalogId}"`);

  return data;
};

export const createCatalogItem = async (
  catalogId: number,
  schema: CreateCatalogSchemaType,
  user: DecodedToken
) => {
  await catalogExists(catalogId);

  await repository.createCatalogItem(catalogId, schema);

  logger.info(
    `[CATALOG] Catálogo creado - "${schema.name}" por el usuario "${user.username}"`
  );
};

export const updateCatalogItem = async (
  catalogId: number,
  catalogItemId: number,
  schema: UpdateCatalogSchemaType,
  user: DecodedToken
) => {
  await catalogItemExists(catalogId, catalogItemId);

  await repository.updateCatalogItem(catalogItemId, schema);

  logger.info(
    `[CATALOG] Catálogo actualizado - "${schema.name}" por el usuario "${user.username}"`
  );
};

export const deleteCatalogItem = async (
  catalogId: number,
  catalogItemId: number,
  user: DecodedToken
) => {
  await catalogItemExists(catalogId, catalogItemId);

  try {
    await repository.deleteCatalogItem(catalogItemId);

    logger.info(
      `[CATALOG] Catálogo eliminado - "${catalogItemId}" por el usuario "${user.username}"`
    );
  } catch (error) {
    if (!isForeignKeyError(error)) throw error;

    await repository.inactivateCatalogItem(catalogItemId);

    logger.info(
      `[CATALOG] Catálogo inactivado - "${catalogItemId}" por el usuario "${user.username}"`
    );
  }
};

const catalogExists = async (catalogId: number) => {
  const data = await repository.getCatalog(catalogId);

  if (!data) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "${catalogId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }
};

const catalogItemExists = async (catalogId: number, catalogItemId: number) => {
  const data = await repository.getCatalogItem(catalogId, catalogItemId);

  if (!data) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "catalog${catalogItemId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }
};
