import {
  CreateStudentSchemaType,
  StudentWithExistingGuardianSchemaType,
} from "@/students/schemas/createStudent.schema";
import { validateStudentDocumentNotDuplicate } from "@/students/validations/validateStudentDocumentNotDuplicate.validation";
import { validateGuardianCanBeAssigned } from "@/guardian/validations/validateGuardianCanBeAssigned.validation";
import { validateStudentDocumentExists } from "@/students/validations/validateStudentDocumentExists.validation";
import { validateCatalogItemExists } from "@/catalogs/validations/validateCatalogItemExists.validation";
import { validateDocumentTypeCannotChange } from "@/validations/validateDocumentTypeMatches.validation";
import { validateGuardianExists } from "@/guardian/validations/validateGuardianExists.validation";
import { CreateStudentDocumentSchemaType } from "@/students/schemas/createStudentDocument.schema";
import { UpdateStudentDocumentSchemaType } from "@/students/schemas/updateStudentDocument.schema";
import { validateStudentCanEdit } from "@/students/validations/validateStudentCanEdit.validation";
import { validateStudentExists } from "@/students/validations/validateStudentExists.validation";
import { validateEmailAvailable } from "@/validations/validateEmailAvailable.validation";
import { generateEnrollmentNumber } from "@/students/utils/generateEnrollment.util";
import { UpdateStudentSchemaType } from "@/students/schemas/updateStudent.schema";
import { SCHOOL_CODE, CATALOGS, STORAGE_FOLDER_CLOUDINARY } from "@/constants";
import * as cloudinaryService from "@/services/cloudinary.service";
import { deleteTempFile } from "@/services/storage.service";
import * as studentRepository from "@/students/repository";
import * as guardianService from "@/guardian/service";
import { logger } from "@/config/logger.config";
import { UploadApiResponse } from "cloudinary";
import { Prisma } from "@prisma/client";

export const searchStudents = async (
  filter: Prisma.StudentWhereInput[],
  skip: number,
  take: number
) => {
  const data = await studentRepository.searchStudents(filter, skip, take);

  logger.info(`[STUDENT] Estudiantes obtenidos - "${data.total}"`);

  return data;
};

export const searchStudent = async (studentId: number) => {
  await validateStudentExists(studentId);

  const data = await studentRepository.searchStudent(studentId);

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
    const guardian = await validateGuardianExists(schema.guardianId);
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
  const student = await validateStudentExists(studentId);

  const studentStatusId = student.studentStatusId;
  const oldEmail = student.user.contactInfo.email;
  const newEmail = schema.user.contactInfo.email;

  validateStudentCanEdit(studentStatusId);
  if (newEmail !== oldEmail) await validateEmailAvailable(newEmail);

  const guardian = await validateGuardianExists(schema.guardianId);
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

export const searchStudentDocuments = async (
  studentId: number,
  filter: Prisma.CatalogItemWhereInput,
  skip: number,
  take: number
) => {
  await validateStudentExists(studentId);

  const data = await studentRepository.searchStudentDocuments(
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
    const student = await validateStudentExists(studentId);
    validateStudentCanEdit(student.studentStatusId);

    await validateCatalogItemExists(
      CATALOGS.STUDENT_DOCUMENT_TYPES,
      schema.documentTypeId
    );
    await validateStudentDocumentNotDuplicate(studentId, schema.documentTypeId);

    newDocument = await cloudinaryService.uploadFile(
      pathImage,
      STORAGE_FOLDER_CLOUDINARY.STUDENT_DOCUMENT
    );

    const createdDocument = await studentRepository.createStudentDocument(
      schema.documentTypeId,
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

export const updateStudentDocument = async (
  pathImage: string,
  studentId: number,
  documentId: number,
  schema: UpdateStudentDocumentSchemaType
) => {
  let newDocument: UploadApiResponse | null = null;

  try {
    const student = await validateStudentExists(studentId);
    validateStudentCanEdit(student.studentStatusId);

    const oldDocument = await validateStudentDocumentExists(
      documentId,
      studentId
    );
    await validateCatalogItemExists(
      CATALOGS.STUDENT_DOCUMENT_TYPES,
      schema.documentTypeId
    );
    validateDocumentTypeCannotChange(
      oldDocument.documentTypeId,
      schema.documentTypeId
    );

    newDocument = await cloudinaryService.uploadFile(
      pathImage,
      STORAGE_FOLDER_CLOUDINARY.STUDENT_DOCUMENT
    );

    const updatedDocument = await studentRepository.updateStudentDocument(
      documentId,
      newDocument.public_id,
      newDocument.secure_url
    );

    await cloudinaryService.deleteFile(oldDocument.publicId);

    logger.info(`[STUDENT-DOCUMENT] Documento actualizado - "${documentId}"`);

    return updatedDocument;
  } catch (error) {
    if (newDocument) await cloudinaryService.deleteFile(newDocument.public_id);

    throw error;
  } finally {
    await deleteTempFile(pathImage);
  }
};
