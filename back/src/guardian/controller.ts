import { CreateGuardianSchema } from "@/guardian/schemas/createGuardian.schema";
import { QueryGuardianSchema } from "@/guardian/schemas/queryGuardian.schema";
import { buildGuardianFilter } from "@/guardian/utils/buildGuardianFilter";
import { getPagination, buildPaginationMeta } from "@/utils/pagination";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
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
        title: "Guardian created successfully",
        detail: "The guardian has been created",
      },
    })
  );
};
