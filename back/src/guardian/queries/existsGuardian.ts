export const existsGuardianQuery = {
  guardianId: true,
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
