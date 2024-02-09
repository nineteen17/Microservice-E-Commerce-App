import env from 'dotenv'
import app from "./app"
import connectDB from './db'

env.config()
connectDB()

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})