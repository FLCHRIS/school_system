import { validateCatalogItemExists } from "@/catalogs/validations/validateCatalogItemExists.validation";
import { validateCatalogExists } from "@/catalogs/validations/validateCatalogExists.validation";
import { CreateCatalogSchemaType } from "@/catalogs/schemas/createCatalog.schema";
import { UpdateCatalogSchemaType } from "@/catalogs/schemas/updateCatalog.schema";
import { isForeignKeyError } from "@/errors/prisma.error";
import * as repository from "@/catalogs/repository";
import { logger } from "@/config/logger";
import { Prisma } from "@prisma/client";

export const searchCatalogs = async (
  filter: Prisma.CatalogWhereInput,
  skip: number,
  take: number
) => {
  const data = await repository.searchCatalogs(filter, skip, take);

  logger.info(`[CATALOG] Catálogos obtenidos - "${data.total}"`);

  return data;
};

export const getCatalogItems = async (catalogId: number) => {
  await validateCatalogExists(catalogId);

  const data = await repository.getCatalogItems(catalogId);

  logger.info(`[CATALOG] Catálogo obtenido - "${catalogId}"`);

  return data;
};

export const createCatalogItem = async (
  catalogId: number,
  schema: CreateCatalogSchemaType
) => {
  await validateCatalogExists(catalogId);

  await repository.createCatalogItem(catalogId, schema);

  logger.info(`[CATALOG] Catálogo creado - "${schema.name}"`);
};

export const updateCatalogItem = async (
  catalogId: number,
  catalogItemId: number,
  schema: UpdateCatalogSchemaType
) => {
  await validateCatalogItemExists(catalogId, catalogItemId);

  await repository.updateCatalogItem(catalogItemId, schema);

  logger.info(`[CATALOG] Catálogo actualizado - "${schema.name}"`);
};

export const deleteCatalogItem = async (
  catalogId: number,
  catalogItemId: number
) => {
  await validateCatalogItemExists(catalogId, catalogItemId);

  try {
    await repository.deleteCatalogItem(catalogItemId);

    logger.info(`[CATALOG] Catálogo eliminado - "${catalogItemId}"`);
  } catch (error) {
    if (!isForeignKeyError(error)) throw error;

    await repository.inactivateCatalogItem(catalogItemId);

    logger.info(`[CATALOG] Catálogo inactivado - "${catalogItemId}"`);
  }
};
