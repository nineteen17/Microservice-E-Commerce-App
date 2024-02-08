import express from 'express'
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv'


dotenv.config()

const app = express()
app.use(cookieParser());
// Middleware


app.use(express.json())

// Routes
app.get('/user-service/', (req, res) => {
  res.status(200).send('Hello from the user service')
})


export default app