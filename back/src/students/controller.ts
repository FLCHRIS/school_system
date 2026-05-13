import { CreateStudentSchema } from "@/students/schemas/createStudent.schema";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import * as service from "@/students/service";
import { Request, Response } from "express";

export const createStudent = async (req: Request, res: Response) => {
  const schema = validateSchema(CreateStudentSchema, req.body);
  const user = req.user!;

  await service.createStudent(schema, user);

  return res.status(201).json(
    createResponse({
      message: {
        title: "Estudiante creado correctamente",
        detail: "Se ha creado la estudiante",
      },
    })
  );
};
