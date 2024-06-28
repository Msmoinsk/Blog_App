import express from 'express'
import { getAllUsers, signUp } from '../controllers/user-controller.js'

const router = express.Router()

router.get("/", getAllUsers)

router.post('/signup', signUp)

export default router