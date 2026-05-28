import {
  CreateStudentSchemaType,
  StudentWithExistingGuardianSchemaType,
} from "@/students/schemas/createStudent.schema";
import { validateStudentDocumentNotDuplicate } from "@/students/policies/validateStudentDocumentNotDuplicate.policy";
import { validateGuardianCanBeAssigned } from "@/guardian/policies/validateGuardianCanBeAssigned.policy";
import { CreateStudentDocumentSchemaType } from "@/students/schemas/createStudentDocument.schema";
import { validateStudentCanEdit } from "@/students/policies/validateStudentCanEdit.policy";
import { validateEmailAvailable } from "@/policies/validateEmailAvailable.policy";
import { UpdateStudentSchemaType } from "@/students/schemas/updateStudent.schema";
import { generateEnrollmentNumber } from "@/students/utils/generateEnrollment";
import { SCHOOL_CODE, CATALOGS, STORAGE_FOLDER_CLOUDINARY } from "@/constants";
import * as cloudinaryService from "@/services/cloudinary";
import * as studentRepository from "@/students/repository";
import * as guardianService from "@/guardian/service";
import * as catalogService from "@/catalogs/service";
import { deleteTempFile } from "@/services/storage";
import { HttpError } from "@/errors/http.error";
import { UploadApiResponse } from "cloudinary";
import { logger } from "@/config/logger";
import { Prisma } from "@prisma/client";

export const getStudents = async (
  filter: Prisma.StudentWhereInput[],
  skip: number,
  take: number
) => {
  const data = await studentRepository.getStudents(filter, skip, take);

  logger.info(`[STUDENT] Estudiantes obtenidos - "${data.total}"`);

  return data;
};

export const getStudent = async (studentId: number) => {
  await existsStudent(studentId);

  const data = await studentRepository.getStudent(studentId);

  logger.info(`[STUDENT] Estudiante obtenido - "${studentId}"`);

  return data;
};

export const createStudent = async (schema: CreateStudentSchemaType) => {
  await validateEmailAvailable(schema.user.contactInfo.email);
  let guardianId: number | undefined;

  if ("guardian" in schema) {
    const guardian = await guardianService.createGuardian(schema.guardian);
    guardianId = guardian.guardianId;
  } else {
    const guardian = await guardianService.existsGuardian(schema.guardianId);
    validateGuardianCanBeAssigned(guardian.user.statusId);
    guardianId = schema.guardianId;
  }

  const data: StudentWithExistingGuardianSchemaType = {
    user: schema.user,
    address: schema.address,
    guardianId,
  };

  const student = await studentRepository.createStudent(data);
  const studentId = student.studentId;

  const enrollmentNumber = generateEnrollmentNumber(SCHOOL_CODE, studentId);
  await studentRepository.setEnrollmentNumber(studentId, enrollmentNumber);

  logger.info(
    `[STUDENT] Estudiante creado - "${schema.user.personalInfo.firstName} ${schema.user.personalInfo.lastName}"`
  );

  return student;
};

export const updateStudent = async (
  schema: UpdateStudentSchemaType,
  studentId: number
) => {
  const student = await existsStudent(studentId);

  const studentStatusId = student.studentStatusId;
  const oldEmail = student.user.contactInfo.email;
  const newEmail = schema.user.contactInfo.email;

  validateStudentCanEdit(studentStatusId);
  if (newEmail !== oldEmail) await validateEmailAvailable(newEmail);

  const guardian = await guardianService.existsGuardian(schema.guardianId);
  validateGuardianCanBeAssigned(guardian.user.statusId);

  const updatedStudent = await studentRepository.updateStudent(
    schema,
    studentId
  );

  logger.info(
    `[STUDENT] Estudiante actualizado - "${schema.user.personalInfo.firstName} ${schema.user.personalInfo.lastName}"`
  );

  return updatedStudent;
};

export const existsStudent = async (studentId: number) => {
  const data = await studentRepository.existsStudent(studentId);

  if (!data) {
    logger.warn(`[STUDENT] Estudiante no encontrado - "${studentId}"`);
    throw new HttpError(404, "No encontrado", "Estudiante no encontrado");
  }

  return data;
};

export const getStudentDocuments = async (
  studentId: number,
  filter: Prisma.CatalogItemWhereInput,
  skip: number,
  take: number
) => {
  await existsStudent(studentId);

  const data = await studentRepository.getStudentDocuments(
    studentId,
    filter,
    skip,
    take
  );

  logger.info(
    `[STUDENT-DOCUMENT] Documentos del estudiante obtenidos - "${data.total}"`
  );

  return data;
};

export const createStudentDocument = async (
  pathImage: string,
  schema: CreateStudentDocumentSchemaType,
  studentId: number
) => {
  let newDocument: UploadApiResponse | null = null;

  try {
    const student = await existsStudent(studentId);
    validateStudentCanEdit(student.studentStatusId);

    await validateStudentDocumentNotDuplicate(studentId, schema.catalogItemId);
    await catalogService.catalogItemExists(
      CATALOGS.STUDENT_DOCUMENT_TYPES,
      schema.catalogItemId
    );

    newDocument = await cloudinaryService.uploadFile(
      pathImage,
      STORAGE_FOLDER_CLOUDINARY.STUDENT_DOCUMENT
    );

    const createdDocument = await studentRepository.createStudentDocument(
      schema.catalogItemId,
      studentId,
      newDocument.public_id,
      newDocument.secure_url
    );

    logger.info(
      `[STUDENT-DOCUMENT] Documento creado - "${createdDocument.studentDocumentId}"`
    );

    return createdDocument;
  } catch (error) {
    if (newDocument) await cloudinaryService.deleteFile(newDocument.public_id);

    throw error;
  } finally {
    await deleteTempFile(pathImage);
  }
};
