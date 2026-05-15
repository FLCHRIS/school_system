import * as repository from "@/guardian/repository";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const existsGuardian = async (guardianId: number) => {
  const data = await repository.existsGuardian(guardianId);

  if (!data) {
    logger.warn(`[GUARDIAN] Tutor no encontrado - "${guardianId}"`);
    throw new HttpError(404, "No encontrado", "Tutor no encontrado");
  }

  return data;
};
