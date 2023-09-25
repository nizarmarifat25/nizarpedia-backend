import express from 'express'
import { addCart, getCart } from '../controller/cartController.js'
import { authenticationCheck } from '../middleware/log.js'

const router = express.Router()

router.get('/:id', authenticationCheck, getCart)
router.post('/', authenticationCheck, addCart)


export default router