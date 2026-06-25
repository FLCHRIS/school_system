import * as repository from "@/catalogs/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const validateCatalogItemExists = async (
  catalogId: number,
  catalogItemId: number
) => {
  const data = await repository.getCatalogItem(catalogId, catalogItemId);

  if (!data) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "catalog${catalogItemId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }
};
