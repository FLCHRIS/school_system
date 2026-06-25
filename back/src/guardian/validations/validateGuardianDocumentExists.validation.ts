import * as repository from "@/guardian/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";

export const validateGuardianDocumentExists = async (
  guardianDocumentId: number,
  guardianId: number
) => {
  const data = await repository.getGuardianDocument(
    guardianDocumentId,
    guardianId
  );

  if (!data) {
    logger.warn(
      `[GUARDIAN-DOCUMENT] Documento no encontrado - "${guardianDocumentId}"`
    );

    throw new HttpError(404, "No encontrado", "Documento no encontrado");
  }

  return data;
};
