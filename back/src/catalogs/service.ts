import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";
import { prisma } from "@/config/prisma";

export const getCatalog = async (catalogId: number) => {
  const data = await prisma.catalogItem.findMany({
    where: {
      catalogId,
      isActive: true,
    },
    orderBy: {
      order: "asc",
    },
    select: {
      catalogItemId: true,
      name: true,
    },
  });

  if (!data.length) {
    logger.warn(`[CATALOG] Catálogo no encontrado - ${catalogId}`);
    throw new HttpError(404, "No encontrado", "Catálogo no encontrado");
  }

  logger.info(`[CATALOG] Catálogo obtenido - ${catalogId}`);

  return data;
};
