import express from 'express'
import { login, logout } from '../controller/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
export default router