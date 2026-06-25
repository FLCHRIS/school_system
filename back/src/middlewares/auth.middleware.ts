import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/services/jwt.service";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    logger.warn(`[AUTH] Sin token - ${req.method} ${req.path}`);
    throw new HttpError(401, "No autorizado", "Token no proporcionado");
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    logger.warn(`[AUTH] Formato inválido - ${req.method} ${req.path}`);
    throw new HttpError(401, "No autorizado", "Formato de token inválido");
  }

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch {
    logger.warn(`[AUTH] Token inválido o expirado - ${req.method} ${req.path}`);
    throw new HttpError(401, "No autorizado", "Token inválido o expirado");
  }
};
