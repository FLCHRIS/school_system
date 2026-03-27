import { Request, Response, NextFunction } from "express";
import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger";

export const allowRolesMiddleware = (roles: number[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user!;

    if (!roles.includes(user.roleId)) {
      logger.warn(
        `[AUTH] Accesso denegado (rol: ${user.roleId}) - ${req.method} ${req.path}`
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
