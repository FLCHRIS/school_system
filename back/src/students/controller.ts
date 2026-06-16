import { CreateStudentDocumentSchema } from "@/students/schemas/createStudentDocument.schema";
import { UpdateStudentDocumentSchema } from "@/students/schemas/updateStudentDocument.schema";
import { QueryStudentDocumentSchema } from "@/students/schemas/queryStudentDocument.schema";
import { buildStudentDocumentFilter } from "@/students/utils/buildStudentDocumentFilter";
import { CreateStudentSchema } from "@/students/schemas/createStudent.schema";
import { UpdateStudentSchema } from "@/students/schemas/updateStudent.schema";
import { QueryStudentSchema } from "@/students/schemas/queryStudent.schema";
import { buildStudentFilter } from "@/students/utils/buildStudentFilter";
import { getPagination, buildPaginationMeta } from "@/utils/pagination";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import { validateFile } from "@/utils/validateFile";
import * as service from "@/students/service";
import { Request, Response } from "express";

export const searchStudents = async (req: Request, res: Response) => {
  const schema = validateSchema(QueryStudentSchema, req.query);

  const pagination = getPagination(schema.page, schema.size);
  const filter = buildStudentFilter(schema);

  const { data, total } = await service.searchStudents(
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

export const searchStudent = async (req: Request, res: Response) => {
  const studentId = Number(req.params.studentId);

  const data = await service.searchStudent(studentId);

  return res.status(200).json(
    createResponse({
      message: {
        title: "Estudiante obtenido correctamente",
        detail: "Se ha obtenido el estudiante",
      },
      data,
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

export const searchStudentDocuments = async (req: Request, res: Response) => {
  const schema = validateSchema(QueryStudentDocumentSchema, req.query);
  const studentId = Number(req.params.studentId);

  const pagination = getPagination(schema.page, schema.size);
  const filter = buildStudentDocumentFilter(schema);

  const { data, total } = await service.searchStudentDocuments(
    studentId,
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

export const createStudentDocument = async (req: Request, res: Response) => {
  const schema = validateSchema(CreateStudentDocumentSchema, req.body);
  const file = validateFile(req.files?.document, "document");
  const studentId = Number(req.params.studentId);

  await service.createStudentDocument(file.tempFilePath, schema, studentId);

  return res.status(201).json(
    createResponse({
      message: {
        title: "Documento creado correctamente",
        detail: "Se ha creado el documento",
      },
    })
  );
};

export const updateStudentDocument = async (req: Request, res: Response) => {
  const schema = validateSchema(UpdateStudentDocumentSchema, req.body);
  const file = validateFile(req.files?.document, "document");
  const documentId = Number(req.params.documentId);
  const studentId = Number(req.params.studentId);

  await service.updateStudentDocument(
    file.tempFilePath,
    studentId,
    documentId,
    schema
  );

  return res.status(200).json(
    createResponse({
      message: {
        title: "Documento actualizado correctamente",
        detail: "Se ha actualizado el documento",
      },
    })
  );
};
