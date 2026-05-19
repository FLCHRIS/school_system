import { ROOT_FOLDER_CLOUDINARY, STORAGE_FOLDER_CLOUDINARY } from "@/constants";
import { cloudinary } from "@/config/cloudinary";

type FolderTypes =
  (typeof STORAGE_FOLDER_CLOUDINARY)[keyof typeof STORAGE_FOLDER_CLOUDINARY];

export const uploadFile = async (filePath: string, folder: FolderTypes) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: `${ROOT_FOLDER_CLOUDINARY}${folder}`,
  });
};

export const deleteFile = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
