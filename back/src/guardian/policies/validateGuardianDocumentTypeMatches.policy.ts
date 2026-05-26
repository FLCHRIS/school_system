import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const validateGuardianDocumentTypeCannotChange = (
  currentTypeId: number,
  newTypeId: number
) => {
  if (currentTypeId !== newTypeId) {
    logger.warn(
      `[GUARDIAN-DOCUMENT] No es posible cambiar el tipo de documento`
    );

    throw new HttpError(
      409,
      "Operación no permitida",
      "No es posible cambiar el tipo de documento"
    );
  }
};
