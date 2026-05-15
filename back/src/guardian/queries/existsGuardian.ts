export const existsGuardianQuery = {
  guardianId: true,
  user: {
    select: {
      statusId: true,
    },
  },
} as const;
