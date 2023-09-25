import express from 'express'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import bannerRoutes from './routes/banner.js'
import productRoutes from './routes/product.js'
import transactionRoutes from './routes/transaction.js'
import cartRoutes from './routes/cart.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import { scheduleJob } from 'node-schedule'

dotenv.config()

const PORT = process.env.PORT;

const app = express()

app.use(cors());
app.use(cookieParser())




app.use(express.json())
app.use(fileUpload())
app.use(express.static("public"))

app.get("/", (_, res) =>{
    return res.status(200).json({
        message : "berhasil deploy app"
    })
})

app.use('/users', usersRoutes)
app.use('/auth', authRoutes)
app.use('/banner', bannerRoutes)
app.use('/product', productRoutes)
app.use('/transaction', transactionRoutes)
app.use('/cart', cartRoutes)

app.listen(PORT, () => {
    console.log("server berhasil dijalankan di port " + PORT)
})