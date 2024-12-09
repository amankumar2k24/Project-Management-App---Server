import express from 'express'
const router = express.Router()

// import controllers
import { getTeams } from '../controllers/teamContoller'

router.get("/", getTeams)

export default router