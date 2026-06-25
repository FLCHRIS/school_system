import { HttpError } from "@/errors/http.error";
import * as repository from "@/auth/repository";
import { logger } from "@/config/logger";

export const validateUserLogInExists = async (username: string) => {
  const data = await repository.findUserForLogin(username);

  if (!data) {
    logger.warn(`[AUTH] Usuario no encontrado - "${username}"`);
    throw new HttpError(401, "No autorizado", "Usuario no encontrado");
  }

  return data;
};
