import express from 'express'

import { authenticationCheck } from '../middleware/log.js'
import { createTransaction, getTransaction } from '../controller/transactionController.js'

const router = express.Router()

router.post('/', authenticationCheck, createTransaction)
router.get('/:id', authenticationCheck, getTransaction)


export default router