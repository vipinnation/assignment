import { Router } from "express";
import { sign_in, sign_up } from "../app/controller/auth.controller";
const router = Router();

router.post("/sign-up", sign_up);
router.post("/sign-in", sign_in);

export { router as authRoutes };
