import { validateUserAccess } from "@/policies/validateUserStatus.policy";
import { LoginSchemaType } from "@/auth/schemas/login.schema";
import { comparePassword } from "@/services/bcrypt";
import { DecodedToken } from "@/types/auth.types";
import { signAccessToken } from "@/services/jwt";
import { HttpError } from "@/errors/http.error";
import * as repository from "@/auth/repository";
import { logger } from "@/config/logger";
import { env } from "@/config/env";

export const logIn = async (schema: LoginSchemaType) => {
  const user = await userLoginExists(schema.username);
  validateUserAccess(user.statusId);

  if (!user.password || !user.username) {
    logger.warn(`[AUTH] Usuario sin acceso al sistema - "${schema.username}"`);
    throw new HttpError(401, "No autorizado", "Usuario sin acceso al sistema");
  }

  if (!(await comparePassword(schema.password, user.password))) {
    logger.warn(`[AUTH] Contraseña incorrecta - "${schema.username}"`);
    throw new HttpError(401, "No autorizado", "Contraseña incorrecta");
  }

  const token = signAccessToken({
    userId: user.userId,
    roleId: user.roleId,
    statusId: user.statusId,
    username: user.username,
  });

  const expiresAt = Date.now() + env.JWT_EXPIRES_IN * 1000;

  logger.info(`[AUTH] Usuario autenticado - "${schema.username}"`);

  return { token, expiresAt };
};

export const getMe = async (user: DecodedToken) => {
  const data = await userGetMeExists(user.userId);

  const statusId = data.status.catalogItemId;
  validateUserAccess(statusId);

  logger.info(`[AUTH] Información de usuario obtenida - "${user.username}"`);

  return data;
};

const userLoginExists = async (username: string) => {
  const data = await repository.findUserForLogin(username);

  if (!data) {
    logger.warn(`[AUTH] Usuario no encontrado - "${username}"`);
    throw new HttpError(401, "No autorizado", "Usuario no encontrado");
  }

  return data;
};

const userGetMeExists = async (userId: number) => {
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
