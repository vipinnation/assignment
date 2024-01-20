import { Router } from "express";
import {
  create_task,
  get_tasks,
  update_task,
  delete_task,
} from "../app/controller/task.controller";
import check_auth from "../app/middleware/checkauth.middleware";

const router = Router();

router.use(check_auth);

router.post("/", create_task);
router.get("/", get_tasks);
router.put("/:taskId", update_task);
router.delete("/:taskId", delete_task);

export { router as taskRoutes };
