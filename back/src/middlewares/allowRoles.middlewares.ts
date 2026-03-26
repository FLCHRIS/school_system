import { Request, Response, NextFunction } from "express";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const allowRolesMiddleware = (roles: number[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      logger.warn(`[AUTH] Usuario no autenticado - ${req.method} ${req.path}`);
      throw new HttpError(401, "No autorizado", "Usuario no autenticado");
    }

    const roleId = req.user?.roleId;

    if (!roles.includes(roleId)) {
      logger.warn(
        `[AUTH] Accesso denegado (rol: ${roleId}) - ${req.method} ${req.path}`
      );
      throw new HttpError(
        403,
        "Prohibido",
        "No tiene permisos para realizar esta acción"
      );
    }

    next();
  };
};
