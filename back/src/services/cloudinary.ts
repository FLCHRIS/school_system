import { ROOT_FOLDER_CLOUDINARY, STORAGE_FOLDER_CLOUDINARY } from "@/constants";
import { cloudinary } from "@/config/cloudinary";
import { HttpError } from "@/errors/http.error";

type FolderTypes =
  (typeof STORAGE_FOLDER_CLOUDINARY)[keyof typeof STORAGE_FOLDER_CLOUDINARY];

export const uploadFile = async (filePath: string, folder: FolderTypes) => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder: `${ROOT_FOLDER_CLOUDINARY}${folder}`,
    });
  } catch {
    throw new HttpError(
      500,
      "Error al subir archivo",
      "No fue posible subir el archivo"
    );
  }
};

export const deleteFile = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    throw new HttpError(
      500,
      "Error al eliminar archivo",
      "No fue posible eliminar el archivo"
    );
  }
};
