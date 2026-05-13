export const guardianSelectAll = {
  guardianId: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      userId: true,
      role: {
        select: {
          catalogItemId: true,
          name: true,
        },
      },
      status: {
        select: {
          catalogItemId: true,
          name: true,
        },
      },
      personalInfo: {
        select: {
          personalInfoId: true,
          firstName: true,
          lastName: true,
          birthDate: true,
          gender: {
            select: {
              catalogItemId: true,
              name: true,
            },
          },
        },
      },
      contactInfo: {
        select: {
          contactInfoId: true,
          email: true,
          phone: true,
        },
      },
      profilePhoto: true,
    },
  },
  address: {
    select: {
      addressId: true,
      street: true,
      neighborhood: true,
      city: true,
      state: true,
      zipCode: true,
      reference: true,
    },
  },
};
