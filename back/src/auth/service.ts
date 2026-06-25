import { validateUserLogInExists } from "@/auth/validations/validateUserLoginExists.validation";
import { validateUserGetMeExists } from "@/auth/validations/validateUserGetMeExists.validation";
import { validateUserExists } from "@/auth/validations/validateUserExists.validation";
import { validateUserAccess } from "@/policies/validateUserAccess.policy";
import { LoginSchemaType } from "@/auth/schemas/login.schema";
import * as cloudinaryService from "@/services/cloudinary";
import { STORAGE_FOLDER_CLOUDINARY } from "@/constants";
import { comparePassword } from "@/services/bcrypt";
import { deleteTempFile } from "@/services/storage";
import { DecodedToken } from "@/types/auth.types";
import { signAccessToken } from "@/services/jwt";
import { HttpError } from "@/errors/http.error";
import * as repository from "@/auth/repository";
import { UploadApiResponse } from "cloudinary";
import { logger } from "@/config/logger";
import { env } from "@/config/env";

export const logIn = async (schema: LoginSchemaType) => {
  const user = await validateUserLogInExists(schema.username);
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
  const data = await validateUserGetMeExists(user.userId);

  const statusId = data.status.catalogItemId;
  validateUserAccess(statusId);

  logger.info(`[AUTH] Información de usuario obtenida - "${user.username}"`);

  return data;
};

export const updateProfilePhoto = async (pathImage: string, userId: number) => {
  let newProfilePhoto: UploadApiResponse | null = null;

  try {
    await validateUserExists(userId);

    const user = await repository.getUserProfilePhoto(userId);
    const oldProfilePhoto = user?.profilePhoto;

    newProfilePhoto = await cloudinaryService.uploadFile(
      pathImage,
      STORAGE_FOLDER_CLOUDINARY.USER_PROFILE_PHOTO
    );

    const updatedUser = await repository.uploadUserProfilePhoto(
      userId,
      newProfilePhoto.public_id,
      newProfilePhoto.secure_url
    );

    if (oldProfilePhoto) {
      await cloudinaryService.deleteFile(oldProfilePhoto.publicId);
    }

    logger.info(
      `[AUTH] Foto de perfil actualizada - "${updatedUser.username}"`
    );

    return updatedUser;
  } catch (error) {
    if (newProfilePhoto) {
      await cloudinaryService.deleteFile(newProfilePhoto.public_id);
    }

    throw error;
  } finally {
    await deleteTempFile(pathImage);
  }
};
