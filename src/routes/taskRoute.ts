import express from "express"
import { createTask, getTasks, getUserTasks, updatedTask } from "../controllers/taskController"

const router = express.Router()

router.get("/", getTasks)
router.post("/", createTask)
router.patch("/:taskId/status", updatedTask)
router.get("/user/:userId", getUserTasks)

export default router