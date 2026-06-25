import { STUDENT_STATUS } from "@/students/constants";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";

export const validateStudentCanEdit = (statusId: number) => {
  if (statusId === STUDENT_STATUS.GRADUATED) {
    logger.warn("[STUDENT] No es posible editar un alumno graduado");

    throw new HttpError(
      409,
      "Operación no permitida",
      "No es posible editar un alumno egresado"
    );
  }

  if (statusId === STUDENT_STATUS.WITHDRAWN) {
    logger.warn("[STUDENT] No es posible editar un alumno dado de baja");

    throw new HttpError(
      409,
      "Operación no permitida",
      "No es posible editar un alumno dado de baja"
    );
  }

  if (statusId === STUDENT_STATUS.TRANSFERRED) {
    logger.warn("[STUDENT] No es posible editar un alumno transferido");

    throw new HttpError(
      409,
      "Operación no permitida",
      "No es posible editar un alumno transferido"
    );
  }
};
