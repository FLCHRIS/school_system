import { CreateGuardianDocumentSchema } from "@/guardian/schemas/createGuardianDocument.schema";
import { UpdateGuardianDocumentSchema } from "@/guardian/schemas/updateGuardianDocument.schema";
import { QueryGuardianDocumentSchema } from "@/guardian/schemas/queryGuardianDocument.schema";
import { buildGuardianDocumentFilter } from "@/guardian/utils/buildGuardianDocumentFilter";
import { CreateGuardianSchema } from "@/guardian/schemas/createGuardian.schema";
import { UpdateGuardianSchema } from "@/guardian/schemas/updateGuardian.schema";
import { QueryGuardianSchema } from "@/guardian/schemas/queryGuardian.schema";
import { buildGuardianFilter } from "@/guardian/utils/buildGuardianFilter";
import { getPagination, buildPaginationMeta } from "@/utils/pagination";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import { validateFile } from "@/utils/validateFile";
import * as service from "@/guardian/service";
import { Request, Response } from "express";

export const getGuardians = async (req: Request, res: Response) => {
  const schema = validateSchema(QueryGuardianSchema, req.query);

  const pagination = getPagination(schema.page, schema.size);
  const filter = buildGuardianFilter(schema);

  const { data, total } = await service.getGuardians(
    filter,
    pagination.skip,
    pagination.take
  );

  return res.status(200).json(
    createResponse({
      message: {
        title: "Tutores obtenidos correctamente",
        detail: "Se han obtenido los tutores",
      },
      data,
      meta: {
        pagination: buildPaginationMeta(total, schema.page, schema.size),
      },
    })
  );
};

export const getGuardian = async (req: Request, res: Response) => {
  const guardianId = Number(req.params.guardianId);

  const data = await service.getGuardian(guardianId);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Tutor obtenido correctamente",
        detail: "Se ha obtenido el tutor",
      },
      data,
    })
  );
};

export const createGuardian = async (req: Request, res: Response) => {
  const schema = validateSchema(CreateGuardianSchema, req.body);

  await service.createGuardian(schema);

  return res.status(201).json(
    createResponse({
      message: {
        title: "Tutor creado correctamente",
        detail: "Se ha creado el tutor",
      },
    })
  );
};

export const updateGuardian = async (req: Request, res: Response) => {
  const schema = validateSchema(UpdateGuardianSchema, req.body);
  const guardianId = Number(req.params.guardianId);

  await service.updateGuardian(schema, guardianId);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Tutor actualizado correctamente",
        detail: "Se ha actualizado el tutor",
      },
    })
  );
};

export const getGuardianDocuments = async (req: Request, res: Response) => {
  const schema = validateSchema(QueryGuardianDocumentSchema, req.query);
  const guardianId = Number(req.params.guardianId);

  const pagination = getPagination(schema.page, schema.size);
  const filter = buildGuardianDocumentFilter(schema);

  const { data, total } = await service.getGuardianDocuments(
    guardianId,
    filter,
    pagination.skip,
    pagination.take
  );

  return res.status(200).json(
    createResponse({
      message: {
        title: "Tutores obtenidos correctamente",
        detail: "Se han obtenido los tutores",
      },
      data,
      meta: {
        pagination: buildPaginationMeta(total, schema.page, schema.size),
      },
    })
  );
};

export const createGuardianDocument = async (req: Request, res: Response) => {
  const schema = validateSchema(CreateGuardianDocumentSchema, req.body);
  const file = validateFile(req.files?.document, "document");
  const guardianId = Number(req.params.guardianId);

  await service.createGuardianDocument(file.tempFilePath, schema, guardianId);

  return res.status(201).json(
    createResponse({
      message: {
        title: "Documento creado correctamente",
        detail: "Se ha creado el documento",
      },
    })
  );
};

export const updateGuardianDocument = async (req: Request, res: Response) => {
  const schema = validateSchema(UpdateGuardianDocumentSchema, req.body);
  const file = validateFile(req.files?.document, "document");
  const guardianId = Number(req.params.guardianId);
  const documentId = Number(req.params.documentId);

  await service.updateGuardianDocument(
    file.tempFilePath,
    guardianId,
    documentId,
    schema
  );

  return res.status(200).json(
    createResponse({
      message: {
        title: "Documento actualizado correctamente",
        detail: "Se ha actualizado el documento",
      },
    })
  );
};
