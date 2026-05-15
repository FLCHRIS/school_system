import {
  CreateStudentSchemaType,
  StudentWithExistingGuardianSchemaType,
} from "@/students/schemas/createStudent.schema";
import { validateGuardianCanBeAssigned } from "@/guardian/policies/validateGuardianCanBeAssigned.policy";
import { generateEnrollmentNumber } from "@/students/utils/generateEnrollment";
import * as studentRepository from "@/students/repository";
import { DecodedToken } from "@/types/auth.types";
import { HttpError } from "@/errors/http.error";
import { SCHOOL_CODE } from "@/constants";
import { logger } from "@/config/logger";
import { Prisma } from "@prisma/client";

import * as guardianRepository from "@/guardian/repository";
import * as guardianService from "@/guardian/service";

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

export const createStudent = async (
  schema: CreateStudentSchemaType,
  user: DecodedToken
) => {
  let guardianId: number | undefined;

  if ("guardian" in schema) {
    const guardian = await guardianRepository.createGuardian(schema.guardian);
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

  const studentId = (await studentRepository.createStudent(data)).studentId;
  const enrollmentNumber = generateEnrollmentNumber(SCHOOL_CODE, studentId);
  await studentRepository.setEnrollmentNumber(studentId, enrollmentNumber);

  logger.info(
    `[STUDENT] Estudiante creado - "${schema.user.personalInfo.firstName} ${schema.user.personalInfo.lastName}" por el usuario "${user.username}"`
  );
};

export const existsStudent = async (studentId: number) => {
  const data = await studentRepository.existsStudent(studentId);

  if (!data) {
    logger.warn(`[STUDENT] Estudiante no encontrado - "${studentId}"`);
    throw new HttpError(404, "No encontrado", "Estudiante no encontrado");
  }
};
