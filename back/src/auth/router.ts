import { authMiddleware } from "@/middlewares/auth.middlewares";
import * as controller from "@/auth/controller";
import { Router } from "express";

const router = Router();

router.post("/login", controller.logIn);
router.get("/me", authMiddleware, controller.getMe);

export default router;
