import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";
import { USER_STATUS } from "@/constants";

export const validateUserAccess = (statusId: number) => {
  if (statusId === USER_STATUS.SUSPENDED) {
    logger.warn("[AUTH] Usuario suspendido");

    throw new HttpError(
      401,
      "No autorizado",
      "El usuario se encuentra suspendido"
    );
  }

  if (statusId === USER_STATUS.INACTIVE) {
    logger.warn("[AUTH] Usuario inactivo");

    throw new HttpError(
      401,
      "No autorizado",
      "El usuario se encuentra inactivo"
    );
  }
};
