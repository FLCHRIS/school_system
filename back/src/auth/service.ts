import { loginSchemaType } from "@/auth/schemas/login.schema";
import { userSelectAll } from "@/auth/queries/userSelect";
import { DecodedToken } from "@/types/auth.types";
import { comparePassword } from "@/utils/bcrypt";
import { HttpError } from "@/errors/http.error";
import { signAccessToken } from "@/utils/jwt";
import { USER_STATUS } from "@/constants";
import { prisma } from "@/config/prisma";
import { logger } from "@/config/logger";
import { env } from "@/config/env";

export const logIn = async (credentials: loginSchemaType) => {
  const user = await prisma.user.findUnique({
    where: {
      username: credentials.username,
      statusId: USER_STATUS.ACTIVE,
    },
  });

  if (!user) {
    logger.warn(`[AUTH] Usuario no encontrado - ${credentials.username}`);
    throw new HttpError(401, "No autorizado", "Usuario no encontrado");
  }

  if (!(await comparePassword(credentials.password, user.password))) {
    logger.warn(`[AUTH] Contraseña incorrecta - ${credentials.username}`);
    throw new HttpError(401, "No autorizado", "Contraseña incorrecta");
  }

  const token = signAccessToken({
    userId: user.userId,
    roleId: user.roleId,
    statusId: user.statusId,
    username: user.username,
  });

  const expiresAt = Date.now() + env.JWT_EXPIRES_IN * 1000;

  logger.info(`[AUTH] Usuario autenticado - ${credentials.username}`);

  return { token, expiresAt };
};

export const getMe = async (user: DecodedToken) => {
  const data = await prisma.user.findUnique({
    where: {
      userId: user.userId,
      statusId: USER_STATUS.ACTIVE,
    },
    select: userSelectAll,
  });

  if (!data) {
    logger.warn(
      `[AUTH] Información de usuario no encontrada - ${user.username}`
    );
    throw new HttpError(
      401,
      "No autorizado",
      "Información de usuario no encontrada"
    );
  }

  logger.info(`[AUTH] Información de usuario obtenida - ${user.username}`);

  return data;
};
