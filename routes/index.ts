import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { taskRoutes } from "./task.routes";
const router = Router();

router.use("/task", taskRoutes);
router.use("/auth", authRoutes);

export default router;
