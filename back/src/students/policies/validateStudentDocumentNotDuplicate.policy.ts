import * as repository from "@/students/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const validateStudentDocumentNotDuplicate = async (
  studentId: number,
  documentTypeId: number
) => {
  const data = await repository.existsStudentDocument(
    studentId,
    documentTypeId
  );

  if (data) {
    logger.warn(`[STUDENT-DOCUMENT] Documento ya existe - "${documentTypeId}"`);
    throw new HttpError(
      409,
      "Documento duplicado",
      "El estudiante ya tiene registrado este documento"
    );
  }
};
