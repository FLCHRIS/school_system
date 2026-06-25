import { HttpError } from "@/errors/http.error";
import * as repository from "@/auth/repository";
import { logger } from "@/config/logger.config";

export const validateUserExists = async (userId: number) => {
  const data = await repository.getUser(userId);

  if (!data) {
    logger.warn(`[AUTH] Usuario no encontrado - "${userId}"`);
    throw new HttpError(401, "No autorizado", "Usuario no encontrado");
  }

  return data;
};
