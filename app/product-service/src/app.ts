import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import productRoutes from'./routes/routes'

dotenv.config()

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json())

// Routes
app.use('/product-service/', productRoutes)
export default app