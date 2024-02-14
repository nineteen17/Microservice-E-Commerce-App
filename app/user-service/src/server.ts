import env from 'dotenv'
env.config()
import app from "./app"
import connectDB from './db'

connectDB()

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})