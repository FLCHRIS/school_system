import {
  CreateStudentSchemaType,
  StudentWithExistingGuardianSchemaType,
} from "@/students/schemas/createStudent.schema";
import * as studentRepository from "@/students/repository";
import { generateEnrollmentNumber } from "@/students/utils/generateEnrollment";
import { DecodedToken } from "@/types/auth.types";
import { SCHOOL_CODE } from "@/constants";
import { logger } from "@/config/logger";

import * as guardianRepository from "@/guardian/repository";
import * as guardianService from "@/guardian/service";

export const createStudent = async (
  schema: CreateStudentSchemaType,
  user: DecodedToken
) => {
  const guardianId =
    "guardian" in schema
      ? (await guardianRepository.createGuardian(schema.guardian)).guardianId
      : (await guardianService.guardianExists(schema.guardianId),
        schema.guardianId);

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
