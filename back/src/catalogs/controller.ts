import { createResponse } from "@/utils/apiResponse";
import * as service from "@/catalogs/service";
import { Request, Response } from "express";

export const getCatalog = async (req: Request, res: Response) => {
  const catalogId = Number(req.params.id);

  const data = await service.getCatalog(catalogId);

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
