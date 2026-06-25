import * as studentRepository from "@/students/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";

export const validateStudentDocumentExists = async (
  studentDocumentId: number,
  studentId: number
) => {
  const data = await studentRepository.getStudentDocument(
    studentDocumentId,
    studentId
  );

  if (!data) {
    logger.warn(
      `[STUDENT-DOCUMENT] Documento no encontrado - "${studentDocumentId}"`
    );

    throw new HttpError(404, "No encontrado", "Documento no encontrado");
  }

  return data;
};
