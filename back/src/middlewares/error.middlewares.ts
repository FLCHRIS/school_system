import { Request, Response, NextFunction } from "express";
import { createResponse } from "@/utils/apiResponse";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json(
      createResponse({
        message: {
          title: error.message,
          ...(error.detail && { detail: error.detail }),
        },
      })
    );
  }

  logger.error(
    { err: error, path: req.path, method: req.method },
    "Error no controlado"
  );

  return res.status(500).json(
    createResponse({
      message: {
        title: "Error interno en el servidor",
        detail: "No se pudo procesar la solicitud",
      },
    })
  );
};
