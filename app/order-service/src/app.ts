import express from 'express'
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes'
import productRoutes from './routes/productRoutes'

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json())

// Routes
app.use('/order-service/', orderRoutes);
app.use('/order-service/', productRoutes);
export default app