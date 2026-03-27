import * as controller from "@/catalogs/controller";
import { Router } from "express";

const router = Router();

router.get("/:id", controller.getCatalog);

export default router;
