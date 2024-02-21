import express from 'express'
import cookieParser from 'cookie-parser';


const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json())

// Routes


export default app