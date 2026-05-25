import * as repository from "@/guardian/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const validateGuardianDocumentNotDuplicate = async (
  guardianId: number,
  documentTypeId: number
) => {
  const data = await repository.existsGuardianDocument(
    guardianId,
    documentTypeId
  );

  if (data) {
    logger.warn(
      `[GUARDIAN-DOCUMENT] Documento ya existe - "${documentTypeId}"`
    );
    throw new HttpError(
      409,
      "Documento duplicado",
      "El tutor ya tiene registrado este documento"
    );
  }
};
