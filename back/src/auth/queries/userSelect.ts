export const userSelectAll = {
  userId: true,
  username: true,
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
  profilePhoto: {
    select: {
      profilePhotoId: true,
      publicId: true,
      url: true,
    },
  },
} as const;

export const userSelectLogIn = {
  username: true,
  password: true,
  statusId: true,
  userId: true,
  roleId: true,
} as const;
