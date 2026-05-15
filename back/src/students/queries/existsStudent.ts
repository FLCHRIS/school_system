export const existsStudentQuery = {
  studentId: true,
  studentStatusId: true,
  user: {
    select: {
      statusId: true,
    },
  },
} as const;
