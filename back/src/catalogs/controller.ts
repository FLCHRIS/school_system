import { CreateCatalogSchema } from "@/catalogs/schemas/createCatalog.schema";
import { UpdateCatalogSchema } from "@/catalogs/schemas/updateCatalog.schema";
import { QueryCatalogSchema } from "@/catalogs/schemas/queryCatalog.schema";
import { buildCatalogFilter } from "@/catalogs/utils/buildCatalogFilter";
import { getPagination, buildPaginationMeta } from "@/utils/pagination";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import * as service from "@/catalogs/service";
import { Request, Response } from "express";

export const getCatalogs = async (req: Request, res: Response) => {
  const schema = validateSchema(QueryCatalogSchema, req.query);

  const pagination = getPagination(schema.page, schema.size);
  const filter = buildCatalogFilter(schema);

  const { data, total } = await service.getCatalogs(
    filter,
    pagination.skip,
    pagination.take
  );

  return res.status(200).json(
    createResponse({
      message: {
        title: "Catálogos obtenidos correctamente",
        detail: "Se han obtenido los catálogos",
      },
      data,
      meta: {
        pagination: buildPaginationMeta(total, schema.page, schema.size),
      },
    })
  );
};

export const getCatalogItems = async (req: Request, res: Response) => {
  const catalogId = Number(req.params.catalogId);

  const data = await service.getCatalogItems(catalogId);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Catálogo obtenido correctamente",
        detail: "Se ha obtenido el catálogo",
      },
      data,
    })
  );
};

export const createCatalogItem = async (req: Request, res: Response) => {
  const schema = validateSchema(CreateCatalogSchema, req.body);
  const catalogId = Number(req.params.catalogId);
  const user = req.user!;

  await service.createCatalogItem(catalogId, schema, user);

  return res.status(201).json(
    createResponse({
      message: {
        title: "Catálogo creado correctamente",
        detail: "Se ha creado el catálogo",
      },
    })
  );
};

export const updateCatalogItem = async (req: Request, res: Response) => {
  const schema = validateSchema(UpdateCatalogSchema, req.body);
  const catalogItemId = Number(req.params.catalogItemId);
  const catalogId = Number(req.params.catalogId);
  const user = req.user!;

  await service.updateCatalogItem(catalogId, catalogItemId, schema, user);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Catálogo actualizado correctamente",
        detail: "Se ha actualizado el catálogo",
      },
    })
  );
};

export const deleteCatalogItem = async (req: Request, res: Response) => {
  const catalogItemId = Number(req.params.catalogItemId);
  const catalogId = Number(req.params.catalogId);
  const user = req.user!;

  await service.deleteCatalogItem(catalogId, catalogItemId, user);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Catálogo eliminado correctamente",
        detail: "Se ha eliminado el catálogo",
      },
    })
  );
};
