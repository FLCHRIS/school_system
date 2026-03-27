import { allowRolesMiddleware } from "@/middlewares/allowRoles.middlewares";
import { authMiddleware } from "@/middlewares/auth.middlewares";
import * as controller from "@/catalogs/controller";
import { USER_ROLES } from "@/constants";
import { Router } from "express";

const router = Router();

router.get("/", controller.getCatalogs);
router.get("/:id", controller.getCatalog);

export default router;
