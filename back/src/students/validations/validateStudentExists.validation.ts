import * as studentRepository from "@/students/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";

export const validateStudentExists = async (studentId: number) => {
  const data = await studentRepository.getStudent(studentId);

  if (!data) {
    logger.warn(`[STUDENT] Estudiante no encontrado - "${studentId}"`);
    throw new HttpError(404, "No encontrado", "Estudiante no encontrado");
  }

  return data;
};
