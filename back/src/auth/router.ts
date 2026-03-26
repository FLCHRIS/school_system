import * as controller from "@/auth/controller";
import { Router } from "express";

const router = Router();

router.post("/login", controller.logIn);

export default router;
