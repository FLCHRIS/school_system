import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";

export const validateDocumentTypeCannotChange = (
  currentTypeId: number,
  newTypeId: number
) => {
  if (currentTypeId !== newTypeId) {
    logger.warn(`[DOCUMENT] No es posible cambiar el tipo de documento`);

    throw new HttpError(
      409,
      "Operación no permitida",
      "No es posible cambiar el tipo de documento"
    );
  }
};
