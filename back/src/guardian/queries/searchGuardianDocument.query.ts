export const searchGuardianDocumentQuery = (guardianId: number) => {
  return {
    catalogItemId: true,
    name: true,
    guardianDocumentsWithType: {
      where: { guardianId },
      select: {
        guardianDocumentId: true,
        publicId: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  } as const;
};
