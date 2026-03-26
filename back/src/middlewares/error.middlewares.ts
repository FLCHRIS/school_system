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
    logger.error(
      `[ERROR] ${req.method} ${req.path} - ${error.message}${
        error.detail ? ` | ${error.detail}` : ""
      }`
    );
    return res.status(error.statusCode).json(
      createResponse({
        message: {
          title: error.message,
          ...(error.detail && { detail: error.detail }),
        },
      })
    );
  }

  const message = "Error interno en el servidor";
  const detail = "No se pudo procesar la solicitud";

  logger.error(`[ERROR] ${req.method} ${req.path} - ${message} | ${detail}`);

  return res.status(500).json(
    createResponse({
      message: {
        title: message,
        detail: detail,
      },
    })
  );
};
