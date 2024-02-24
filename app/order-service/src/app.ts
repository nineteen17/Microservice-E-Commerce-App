import express from 'express'
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes'

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json())

// Routes
app.use('/order-service/', orderRoutes);

export default app