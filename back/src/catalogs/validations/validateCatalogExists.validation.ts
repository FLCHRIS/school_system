import * as repository from "@/catalogs/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";

export const validateCatalogExists = async (catalogId: number) => {
  const data = await repository.getCatalog(catalogId);

  if (!data) {
    logger.warn(`[CATALOG] Catálogo no encontrado - "${catalogId}"`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }
};
