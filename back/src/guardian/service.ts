import { validateGuardianDocumentTypeCannotChange } from "@/guardian/policies/validateGuardianDocumentTypeMatches.policy";
import { validateGuardianDocumentNotDuplicate } from "@/guardian/policies/validateGuardianDocumentNotDuplicate.policy";
import { UpdateGuardianDocumentSchemaType } from "@/guardian/schemas/updateGuardianDocument.schema";
import { CreateGuardianDocumentSchemaType } from "@/guardian/schemas/createGuardianDocument.schema";
import { validateGuardianCanEdit } from "@/guardian/policies/validateGuardianCanEdit.policy";
import { CreateGuardianSchemaType } from "@/guardian/schemas/createGuardian.schema";
import { UpdateGuardianSchemaType } from "@/guardian/schemas/updateGuardian.schema";
import { validateEmailAvailable } from "@/policies/validateEmailAvailable.policy";
import { CATALOGS, STORAGE_FOLDER_CLOUDINARY } from "@/constants";
import * as cloudinaryService from "@/services/cloudinary";
import * as catalogService from "@/catalogs/service";
import * as repository from "@/guardian/repository";
import { deleteTempFile } from "@/services/storage";
import { HttpError } from "@/errors/http.error";
import { UploadApiResponse } from "cloudinary";
import { logger } from "@/config/logger";
import { Prisma } from "@prisma/client";

export const getGuardians = async (
  filter: Prisma.GuardianWhereInput[],
  skip: number,
  take: number
) => {
  const data = await repository.getGuardians(filter, skip, take);

  logger.info(`[GUARDIAN] Tutores obtenidos - "${data.total}"`);

  return data;
};

export const getGuardian = async (guardianId: number) => {
  await existsGuardian(guardianId);

  const data = await repository.getGuardian(guardianId);

  logger.info(`[GUARDIAN] Tutor obtenido - "${guardianId}"`);

  return data;
};

export const createGuardian = async (schema: CreateGuardianSchemaType) => {
  await validateEmailAvailable(schema.user.contactInfo.email);

  const data = await repository.createGuardian(schema);

  logger.info(
    `[GUARDIAN] Tutor creado - "${schema.user.personalInfo.firstName} ${schema.user.personalInfo.lastName}"`
  );

  return data;
};

export const updateGuardian = async (
  schema: UpdateGuardianSchemaType,
  guardianId: number
) => {
  const guardian = await existsGuardian(guardianId);

  const guardianStatusId = guardian.user.statusId;
  const oldEmail = guardian.user.contactInfo.email;
  const newEmail = schema.user.contactInfo.email;

  validateGuardianCanEdit(guardianStatusId);
  if (newEmail !== oldEmail) await validateEmailAvailable(newEmail);

  const updatedGuardian = await repository.updateGuardian(schema, guardianId);

  logger.info(
    `[GUARDIAN] Tutor actualizado - "${schema.user.personalInfo.firstName} ${schema.user.personalInfo.lastName}"`
  );

  return updatedGuardian;
};

export const existsGuardian = async (guardianId: number) => {
  const data = await repository.existsGuardian(guardianId);

  if (!data) {
    logger.warn(`[GUARDIAN] Tutor no encontrado - "${guardianId}"`);
    throw new HttpError(404, "No encontrado", "Tutor no encontrado");
  }

  return data;
};

export const getGuardianDocuments = async (
  guardianId: number,
  filter: Prisma.CatalogItemWhereInput,
  skip: number,
  take: number
) => {
  await existsGuardian(guardianId);

  const data = await repository.getGuardianDocuments(
    guardianId,
    filter,
    skip,
    take
  );

  logger.info(
    `[GUARDIAN-DOCUMENT] Documentos del tutor obtenidos - "${data.total}"`
  );

  return data;
};

export const createGuardianDocument = async (
  pathImage: string,
  schema: CreateGuardianDocumentSchemaType,
  guardianId: number
) => {
  let newDocument: UploadApiResponse | null = null;

  try {
    const guardian = await existsGuardian(guardianId);
    validateGuardianCanEdit(guardian.user.statusId);

    await validateGuardianDocumentNotDuplicate(
      guardianId,
      schema.catalogItemId
    );
    await catalogService.catalogItemExists(
      CATALOGS.GUARDIAN_DOCUMENT_TYPES,
      schema.catalogItemId
    );

    newDocument = await cloudinaryService.uploadFile(
      pathImage,
      STORAGE_FOLDER_CLOUDINARY.GUARDIAN_DOCUMENT
    );

    const createdDocument = await repository.createGuardianDocument(
      schema.catalogItemId,
      guardianId,
      newDocument.public_id,
      newDocument.secure_url
    );

    logger.info(
      `[GUARDIAN-DOCUMENT] Documento creado - "${createdDocument.guardianDocumentId}"`
    );

    return createdDocument;
  } catch (error) {
    if (newDocument) await cloudinaryService.deleteFile(newDocument.public_id);

    throw error;
  } finally {
    await deleteTempFile(pathImage);
  }
};

export const updateGuardianDocument = async (
  pathImage: string,
  guardianId: number,
  documentId: number,
  schema: UpdateGuardianDocumentSchemaType
) => {
  let newDocument: UploadApiResponse | null = null;

  try {
    const guardian = await existsGuardian(guardianId);
    validateGuardianCanEdit(guardian.user.statusId);

    const oldDocument = await existsGuardianDocument(documentId, guardianId);
    await catalogService.catalogItemExists(
      CATALOGS.GUARDIAN_DOCUMENT_TYPES,
      schema.catalogItemId
    );
    validateGuardianDocumentTypeCannotChange(
      oldDocument.documentTypeId,
      schema.catalogItemId
    );

    newDocument = await cloudinaryService.uploadFile(
      pathImage,
      STORAGE_FOLDER_CLOUDINARY.GUARDIAN_DOCUMENT
    );

    const updatedDocument = await repository.updateGuardianDocument(
      documentId,
      newDocument.public_id,
      newDocument.secure_url
    );

    await cloudinaryService.deleteFile(oldDocument.publicId);

    logger.info(`[GUARDIAN-DOCUMENT] Documento actualizado - "${documentId}"`);

    return updatedDocument;
  } catch (error) {
    if (newDocument) await cloudinaryService.deleteFile(newDocument.public_id);

    throw error;
  } finally {
    await deleteTempFile(pathImage);
  }
};

export const existsGuardianDocument = async (
  guardianDocumentId: number,
  guardianId: number
) => {
  const data = await repository.existsGuardianDocument(
    guardianDocumentId,
    guardianId
  );

  if (!data) {
    logger.warn(
      `[GUARDIAN-DOCUMENT] Documento no encontrado - "${guardianDocumentId}"`
    );

    throw new HttpError(404, "No encontrado", "Documento no encontrado");
  }

  return data;
};
