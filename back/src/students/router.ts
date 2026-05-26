import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
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
  controller.getStudents
);
router.get(
  "/:studentId",
  authMiddleware,
  allowRolesMiddleware([
    USER_ROLES.DIRECTOR,
    USER_ROLES.SECRETARY,
    USER_ROLES.TEACHER,
  ]),
  controller.getStudent
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
  controller.getStudentDocuments
);

export default router;
