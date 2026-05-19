import { HttpError } from "@/errors/http.error";
import { USER_STATUS } from "@/constants";
import { logger } from "@/config/logger";

export const validateGuardianCanEdit = (statusId: number) => {
  if (statusId === USER_STATUS.SUSPENDED) {
    logger.warn("[GUARDIAN] Tutor suspendido");

    throw new HttpError(
      401,
      "No autorizado",
      "El tutor se encuentra suspendido"
    );
  }

  if (statusId === USER_STATUS.INACTIVE) {
    logger.warn("[GUARDIAN] Tutor inactivo");

    throw new HttpError(401, "No autorizado", "El tutor se encuentra inactivo");
  }
};
