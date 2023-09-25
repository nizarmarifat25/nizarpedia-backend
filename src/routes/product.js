import express from 'express'

import { authenticationCheck } from '../middleware/log.js'
import { getProduct, createProduct, getProductById } from '../controller/productController.js'

const router = express.Router()

router.get('/', authenticationCheck, getProduct)
router.get('/:id', authenticationCheck, getProductById)
router.post('/', authenticationCheck, createProduct)


export default router