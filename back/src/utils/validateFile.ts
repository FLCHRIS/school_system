import { ValidationError } from "@/types/error.types";
import { UploadedFile } from "express-fileupload";
import { HttpError } from "@/errors/http.error";

type UploadedFileType = UploadedFile | UploadedFile[] | undefined;

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const validateFile = (file: UploadedFileType, fieldName: string) => {
  const errors: ValidationError[] = [];

  if (!file) {
    errors.push({
      field: fieldName,
      message: "El archivo es requerido",
    });
  }

  if (Array.isArray(file)) {
    errors.push({
      field: fieldName,
      message: "Solo se permite un archivo",
    });
  }

  if (!file || Array.isArray(file)) {
    throw new HttpError(400, "Archivo inválido", undefined, errors);
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    errors.push({
      field: fieldName,
      message: "Tipo de archivo no permitido",
    });
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.push({
      field: fieldName,
      message: "El archivo excede el tamaño permitido",
    });
  }

  if (errors.length > 0) {
    throw new HttpError(400, "Archivo inválido", undefined, errors);
  }

  return file;
};
