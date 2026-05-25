import { validateGuardianCanEdit } from "@/guardian/policies/validateGuardianCanEdit.policy";
import { CreateGuardianSchemaType } from "@/guardian/schemas/createGuardian.schema";
import { UpdateGuardianSchemaType } from "@/guardian/schemas/updateGuardian.schema";
import { validateEmailAvailable } from "@/policies/validateEmailAvailable.policy";
import * as repository from "@/guardian/repository";
import { HttpError } from "@/errors/http.error";
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
