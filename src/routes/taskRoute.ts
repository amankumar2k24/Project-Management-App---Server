import express from "express"
import { createTask, getTasks, updatedTask } from "../controllers/taskController"

const router = express.Router()

router.get("/", getTasks)
router.post("/", createTask)
router.patch("/:taskId/status", updatedTask)

export default router