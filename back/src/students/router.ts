import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
import { uploadMiddleware } from "@/middlewares/upload.middlewares";
import { authMiddleware } from "@/middlewares/auth.middlewares";
import * as controller from "@/students/controller";
import { USER_ROLES } from "@/constants";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  authMiddleware,
  allowRolesMiddleware([
    USER_ROLES.DIRECTOR,
    USER_ROLES.SECRETARY,
    USER_ROLES.TEACHER,
  ]),
  controller.searchStudents
);
router.get(
  "/:studentId",
  authMiddleware,
  allowRolesMiddleware([
    USER_ROLES.DIRECTOR,
    USER_ROLES.SECRETARY,
    USER_ROLES.TEACHER,
  ]),
  controller.searchStudent
);
router.post(
  "/",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.createStudent
);
router.put(
  "/:studentId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.updateStudent
);

router.get(
  "/:studentId/documents",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.searchStudentDocuments
);
router.post(
  "/:studentId/documents",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  uploadMiddleware,
  controller.createStudentDocument
);
router.put(
  "/:studentId/documents/:documentId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  uploadMiddleware,
  controller.updateStudentDocument
);

export default router;
