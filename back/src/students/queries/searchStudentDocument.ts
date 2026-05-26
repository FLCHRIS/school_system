export const searchStudentDocumentQuery = (studentId: number) => {
  return {
    catalogItemId: true,
    name: true,
    studentDocumentsWithType: {
      where: { studentId },
      select: {
        studentDocumentId: true,
        publicId: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  } as const;
};
