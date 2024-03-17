import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/routes";
import cors from "cors";
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://127.0.0.1:3000",
  credentials: true,
};
app.use(cors(corsOptions));
// Routes
app.use("/product-service/", productRoutes);
export default app;
