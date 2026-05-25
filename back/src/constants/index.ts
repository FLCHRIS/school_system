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

export const CATALOGS = {
  USER_ROLES: 1,
  USER_STATUSES: 2,
  GENDERS: 3,
  STUDENT_DOCUMENT_TYPES: 4,
  SCHOOL_GRADES: 5,
  SCHOOL_GROUPS: 6,
  REPORT_CARD_STATUSES: 7,
  GUARDIAN_DOCUMENT_TYPES: 8,
  STUDENT_STATUSES: 9,
} as const;

export const STORAGE_FOLDER_CLOUDINARY = {
  USER_PROFILE_PHOTO: "users/profile-photos",
  STUDENT_DOCUMENT: "students/documents",
  GUARDIAN_DOCUMENT: "guardians/documents",
} as const;

export const SCHOOL_CODE = "SEC";

export const ROOT_FOLDER_CLOUDINARY = "school_system/";
