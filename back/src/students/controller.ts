import { CreateStudentSchema } from "@/students/schemas/createStudent.schema";
import { QueryStudentSchema } from "@/students/schemas/queryStudent.schema";
import { buildStudentFilter } from "@/students/utils/buildStudentFilter";
import { getPagination, buildPaginationMeta } from "@/utils/pagination";
import { UpdateStudentSchema } from "./schemas/updateStudent.schema";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import * as service from "@/students/service";
import { Request, Response } from "express";

export const getStudents = async (req: Request, res: Response) => {
  const schema = validateSchema(QueryStudentSchema, req.query);

  const pagination = getPagination(schema.page, schema.size);
  const filter = buildStudentFilter(schema);

  const { data, total } = await service.getStudents(
    filter,
    pagination.skip,
    pagination.take
  );

  return res.status(200).json(
    createResponse({
      message: {
        title: "Estudiantes obtenidos correctamente",
        detail: "Se han obtenido los estudiantes",
      },
      data,
      meta: {
        pagination: buildPaginationMeta(total, schema.page, schema.size),
      },
    })
  );
};

export const getStudent = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const data = await service.getStudent(studentId);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Estudiante obtenido correctamente",
        detail: "Se ha obtenido el estudiante",
      },
      data: data,
    })
  );
};

export const createStudent = async (req: Request, res: Response) => {
  const schema = validateSchema(CreateStudentSchema, req.body);

  await service.createStudent(schema);

  return res.status(201).json(
    createResponse({
      message: {
        title: "Estudiante creado correctamente",
        detail: "Se ha creado el estudiante",
      },
    })
  );
};

export const updateStudent = async (req: Request, res: Response) => {
  const schema = validateSchema(UpdateStudentSchema, req.body);
  const studentId = Number(req.params.studentId);

  await service.updateStudent(schema, studentId);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Estudiante actualizado correctamente",
        detail: "Se ha actualizado el estudiante",
      },
    })
  );
};
