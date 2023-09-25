import express from 'express'
import { getBanner, createBanner } from '../controller/bannerController.js'
import { authenticationCheck } from '../middleware/log.js'

const router = express.Router()

router.get('/', authenticationCheck, getBanner)
router.post('/', authenticationCheck, createBanner)


export default router