import { loginSchema } from "@/auth/schemas/login.schema";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import { Request, Response } from "express";
import * as service from "@/auth/service";

export const logIn = async (req: Request, res: Response) => {
  const credentials = validateSchema(loginSchema, req.body);

  const data = await service.logIn(credentials);

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
