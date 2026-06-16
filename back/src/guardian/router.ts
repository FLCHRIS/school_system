import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
import { uploadMiddleware } from "@/middlewares/upload.middlewares";
import { authMiddleware } from "@/middlewares/auth.middlewares";
import * as controller from "@/guardian/controller";
import { USER_ROLES } from "@/constants";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.searchGuardians
);
router.get(
  "/:guardianId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.searchGuardian
);
router.post(
  "/",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.createGuardian
);
router.put(
  "/:guardianId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.updateGuardian
);

router.get(
  "/:guardianId/documents",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  controller.searchGuardianDocuments
);
router.post(
  "/:guardianId/documents",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  uploadMiddleware,
  controller.createGuardianDocument
);
router.put(
  "/:guardianId/documents/:documentId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR, USER_ROLES.SECRETARY]),
  uploadMiddleware,
  controller.updateGuardianDocument
);

export default router;
