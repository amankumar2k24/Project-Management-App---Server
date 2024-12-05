import express from 'express'
const router = express.Router()

// import controllers
import { createProject, getProjects } from '../controllers/projectController'

router.get("/", getProjects)
router.post("/", createProject)

export default router