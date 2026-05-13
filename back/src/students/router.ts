import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
import { authMiddleware } from "@/middlewares/auth.middlewares";
import * as controller from "@/students/controller";
import { USER_ROLES } from "@/constants";
import { Router } from "express";

const router = Router();

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

export default router;
