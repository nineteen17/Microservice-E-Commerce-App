import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import cors from "cors";
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.set('trust proxy', 1);

const allowedOrigins = ['http://127.0.0.1:3000'];

app.use(cors({ 
  origin: [ 
    'http://127.0.0.1:3000'
  ], 
  methods: ['GET', 'PUT', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], 
  credentials: true, 
  maxAge: 600, 
  exposedHeaders: ['*', 'Authorization' ] 
}));

// Routes
app.use("/user-service/", userRouter);
app.use("/user-service/", authRouter);

export default app;
