import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from'./routes/routes'

dotenv.config()

const app = express()
app.use(cookieParser());
// Middleware

app.use(express.json())

// Routes

// app.get('/product-service', (req, res) => {
//   res.status(200).send('Hello from the product service again')
// })

// app.get('/product-service/test', (req, res) => {
//   res.status(200).send("Test Successful");
// });

// app.get('/product-service/:id', (req, res) => {
//   const productId = req.params.id;
//   res.status(200).json({ productService: { id: productId, name: 'Test Product', description: 'This is a test product.' } });
// });
app.use('/product-service/', productRoutes)
export default app