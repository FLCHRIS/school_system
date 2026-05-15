import { HttpError } from "@/errors/http.error";
import { USER_STATUS } from "@/constants";
import { logger } from "@/config/logger";

export const validateGuardianCanBeAssigned = (statusId: number) => {
  if (statusId === USER_STATUS.SUSPENDED) {
    logger.warn("[GUARDIAN] No es posible asignar un tutor suspendido");

    throw new HttpError(
      409,
      "Operación no permitida",
      "No es posible asignar un tutor suspendido"
    );
  }

  if (statusId === USER_STATUS.INACTIVE) {
    logger.warn("[GUARDIAN] No es posible asignar un tutor inactivo");

    throw new HttpError(
      409,
      "Operación no permitida",
      "No es posible asignar un tutor inactivo"
    );
  }
};
