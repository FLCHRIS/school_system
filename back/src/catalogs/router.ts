import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
import { authMiddleware } from "@/middlewares/auth.middlewares";
import * as controller from "@/catalogs/controller";
import { USER_ROLES } from "@/constants";
import { Router } from "express";

const router = Router();

router.get(
  "/",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR]),
  controller.getCatalogs
);
router.get("/:id", controller.getCatalog);
router.post(
  "/",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR]),
  controller.createCatalog
);
router.put(
  "/:id",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR]),
  controller.updateCatalog
);

export default router;
