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

router.get("/:catalogId/items", controller.getCatalogItems);
router.post(
  "/:catalogId/items",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR]),
  controller.createCatalogItem
);
router.put(
  "/:catalogId/items/:catalogItemId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR]),
  controller.updateCatalogItem
);
router.delete(
  "/:catalogId/items/:catalogItemId",
  authMiddleware,
  allowRolesMiddleware([USER_ROLES.DIRECTOR]),
  controller.deleteCatalogItem
);

export default router;
