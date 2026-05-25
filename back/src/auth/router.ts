import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
import { uploadMiddleware } from "@/middlewares/upload.middlewares";
import { authMiddleware } from "@/middlewares/auth.middlewares";
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
