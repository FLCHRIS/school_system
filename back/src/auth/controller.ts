import { LoginSchema } from "@/auth/schemas/login.schema";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import { Request, Response } from "express";
import * as service from "@/auth/service";

export const logIn = async (req: Request, res: Response) => {
  const schema = validateSchema(LoginSchema, req.body);

  const data = await service.logIn(schema);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Inicio de sesión exitoso",
        detail: "Se ha iniciado sesión correctamente",
      },
      data,
    })
  );
};

export const getMe = async (req: Request, res: Response) => {
  const user = req.user!;

  const data = await service.getMe(user);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Usuario obtenido correctamente",
        detail: "Se ha obtenido la información del usuario",
      },
      data,
    })
  );
};
