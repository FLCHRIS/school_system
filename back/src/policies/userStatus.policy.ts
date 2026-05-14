import { HttpError } from "@/errors/http.error";
import { USER_STATUS } from "@/constants";
import { logger } from "@/config/logger";

export const validateUserAccess = (statusId: number, username?: string) => {
  if (statusId === USER_STATUS.SUSPENDED) {
    logger.warn(`[AUTH] Usuario suspendido - "${username}"`);

    throw new HttpError(
      401,
      "No autorizado",
      "El usuario se encuentra suspendido"
    );
  }

  if (statusId === USER_STATUS.INACTIVE) {
    logger.warn(`[AUTH] Usuario inactivo - "${username}"`);

    throw new HttpError(
      401,
      "No autorizado",
      "El usuario se encuentra inactivo"
    );
  }
};
