import express from 'express'
import cookieParser from 'cookie-parser';
import testRouter  from './routes/testRoutes';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json())

// Routes
app.use('/user-service/',userRouter)
app.use('/user-service/', authRouter)

export default app