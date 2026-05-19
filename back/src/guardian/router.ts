import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
import { authMiddleware } from "@/middlewares/auth.middlewares";
import * as controller from "@/guardian/controller";
import { USER_ROLES } from "@/constants";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.getGuardians
);
router.get(
  "/:guardianId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.getGuardian
);
router.post(
  "/",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.createGuardian
);

export default router;
