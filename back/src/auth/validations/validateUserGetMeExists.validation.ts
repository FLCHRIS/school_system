import { HttpError } from "@/errors/http.error";
import * as repository from "@/auth/repository";
import { logger } from "@/config/logger.config";

export const validateUserGetMeExists = async (userId: number) => {
  const data = await repository.findUserForGetMe(userId);

  if (!data) {
    logger.warn(`[AUTH] Información de usuario no encontrada - "${userId}"`);
    throw new HttpError(
      401,
      "No autorizado",
      "Información de usuario no encontrada"
    );
  }

  return data;
};
