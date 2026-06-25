import { allowRolesMiddleware } from "@/middlewares/allowRoles.middleware";
import { uploadMiddleware } from "@/middlewares/upload.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import * as controller from "@/auth/controller";
import { USER_ROLES } from "@/constants";
import { Router } from "express";

const router = Router();

router.post("/login", controller.logIn);
router.get("/me", authMiddleware, controller.getMe);
router.post(
  "/profile-photo",
  authMiddleware,
  allowRolesMiddleware([
    USER_ROLES.DIRECTOR,
    USER_ROLES.SECRETARY,
    USER_ROLES.TEACHER,
  ]),
  uploadMiddleware,
  controller.updateProfilePhoto
);

export default router;
