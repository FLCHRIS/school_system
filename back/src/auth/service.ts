import { LoginSchemaType } from "@/auth/schemas/login.schema";
import { DecodedToken } from "@/types/auth.types";
import { comparePassword } from "@/utils/bcrypt";
import { HttpError } from "@/errors/http.error";
import * as repository from "@/auth/repository";
import { signAccessToken } from "@/utils/jwt";
import { logger } from "@/config/logger";
import { env } from "@/config/env";

export const logIn = async (schema: LoginSchemaType) => {
  const user = await userLoginExists(schema.username);

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
