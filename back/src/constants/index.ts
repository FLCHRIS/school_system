export const USER_STATUS = {
  ACTIVE: 6,
  INACTIVE: 7,
  SUSPENDED: 8,
} as const;

export const USER_ROLES = {
  DIRECTOR: 1,
  SECRETARY: 2,
  TEACHER: 3,
  STUDENT: 4,
  GUARDIAN: 5,
} as const;

export const STORAGE_FOLDER_CLOUDINARY = {
  USER_PROFILE_PHOTO: "users/profile-photos",

  STUDENT_DOCUMENT: "students/documents",
  GUARDIAN_DOCUMENT: "guardians/documents",
} as const;

export const SCHOOL_CODE = "SEC";

export const ROOT_FOLDER_CLOUDINARY = "school_system/";
