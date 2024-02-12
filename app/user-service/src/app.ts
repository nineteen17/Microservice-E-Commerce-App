import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import testRouter  from './routes/testRoutes';
import userRouter from './routes/routes';

dotenv.config()

const app = express()
app.use(cookieParser());
// Middleware


app.use(express.json())

// Routes
app.get('/user-service/', (req, res) => {
  res.status(200).send('Hello from the user service')
})
app.use(testRouter)
app.use('/user-service/',userRouter)

export default app