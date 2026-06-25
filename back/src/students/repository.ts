import { StudentWithExistingGuardianSchemaType } from "@/students/schemas/createStudent.schema";
import { searchStudentDocumentQuery } from "@/students/queries/searchStudentDocument";
import { UpdateStudentSchemaType } from "@/students/schemas/updateStudent.schema";
import { getStudentDocumentQuery } from "@/students/queries/getStudentDocument";
import { searchStudentQuery } from "@/students/queries/searchStudent";
import { getStudentQuery } from "@/students/queries/getStudent";
import { USER_ROLES, USER_STATUS, CATALOGS } from "@/constants";
import { STUDENT_STATUS } from "@/students/constants";
import { prisma } from "@/config/prisma.config";
import { Prisma } from "@prisma/client";

export const searchStudents = async (
  filter: Prisma.StudentWhereInput[],
  skip: number,
  take: number
) => {
  const [data, total] = await Promise.all([
    prisma.student.findMany({
      take,
      skip,
      where: { AND: filter },
      select: searchStudentQuery,
    }),
    prisma.student.count({ where: { AND: filter } }),
  ]);

  return { data, total };
};

export const searchStudent = async (studentId: number) => {
  return await prisma.student.findUnique({
    where: { studentId },
    select: searchStudentQuery,
  });
};

export const createStudent = async (
  data: StudentWithExistingGuardianSchemaType
) => {
  return await prisma.student.create({
    data: {
      status: { connect: { catalogItemId: STUDENT_STATUS.PENDING } },
      user: {
        create: {
          role: { connect: { catalogItemId: USER_ROLES.STUDENT } },
          status: { connect: { catalogItemId: USER_STATUS.ACTIVE } },
          personalInfo: {
            create: {
              firstName: data.user.personalInfo.firstName,
              lastName: data.user.personalInfo.lastName,
              birthDate: data.user.personalInfo.birthDate,
              gender: {
                connect: { catalogItemId: data.user.personalInfo.genderId },
              },
            },
          },
          contactInfo: {
            create: {
              email: data.user.contactInfo.email,
              phone: data.user.contactInfo.phone,
            },
          },
        },
      },
      address: {
        create: {
          street: data.address.street,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          reference: data.address.reference ?? null,
        },
      },
      guardian: {
        connect: { guardianId: data.guardianId },
      },
    },
  });
};

export const updateStudent = async (
  data: UpdateStudentSchemaType,
  studentId: number
) => {
  return await prisma.student.update({
    where: { studentId },
    data: {
      guardian: {
        connect: { guardianId: data.guardianId },
      },
      user: {
        update: {
          personalInfo: {
            update: {
              firstName: data.user.personalInfo.firstName,
              lastName: data.user.personalInfo.lastName,
              birthDate: data.user.personalInfo.birthDate,
              gender: {
                connect: { catalogItemId: data.user.personalInfo.genderId },
              },
            },
          },
          contactInfo: {
            update: {
              email: data.user.contactInfo.email,
              phone: data.user.contactInfo.phone,
            },
          },
        },
      },
      address: {
        update: {
          street: data.address.street,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          reference: data.address.reference ?? null,
        },
      },
    },
  });
};

export const getStudent = async (studentId: number) => {
  return await prisma.student.findUnique({
    where: { studentId },
    select: getStudentQuery,
  });
};

export const setEnrollmentNumber = async (
  studentId: number,
  enrollmentNumber: string
) => {
  await prisma.student.update({
    where: { studentId },
    data: { enrollmentNumber },
  });
};

export const searchStudentDocuments = async (
  studentId: number,
  filter: Prisma.CatalogItemWhereInput,
  skip: number,
  take: number
) => {
  const where: Prisma.CatalogItemWhereInput = {
    catalogId: CATALOGS.STUDENT_DOCUMENT_TYPES,
    isActive: true,
    ...filter,
  };

  const [data, total] = await Promise.all([
    prisma.catalogItem.findMany({
      take,
      skip,
      where,
      select: searchStudentDocumentQuery(studentId),
    }),
    prisma.catalogItem.count({ where }),
  ]);

  return { data, total };
};

export const createStudentDocument = async (
  documentTypeId: number,
  studentId: number,
  publicId: string,
  url: string
) => {
  return await prisma.studentDocument.create({
    data: {
      publicId,
      url,
      student: { connect: { studentId } },
      type: { connect: { catalogItemId: documentTypeId } },
    },
  });
};

export const updateStudentDocument = async (
  studentDocumentId: number,
  publicId: string,
  url: string
) => {
  return await prisma.studentDocument.update({
    where: { studentDocumentId },
    data: { publicId, url },
  });
};

export const getStudentDocument = async (
  studentDocumentId: number,
  studentId: number
) => {
  return await prisma.studentDocument.findFirst({
    where: { studentDocumentId, studentId },
    select: getStudentDocumentQuery,
  });
};

export const getStudentDocumentByType = async (
  studentId: number,
  documentTypeId: number
) => {
  return await prisma.studentDocument.findFirst({
    where: { studentId, documentTypeId },
    select: getStudentDocumentQuery,
  });
};
