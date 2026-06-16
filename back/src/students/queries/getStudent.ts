export const getStudentQuery = {
  studentId: true,
  studentStatusId: true,
  user: {
    select: {
      statusId: true,
      contactInfo: {
        select: {
          email: true,
        },
      },
    },
  },
} as const;
