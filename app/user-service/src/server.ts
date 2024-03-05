import env from 'dotenv'
env.config()
import app from "./app"
import connectDB from './db'
import { subscribeToMessages } from './rabbitmq/subscribe'
import { connectToRabbitMQ } from './rabbitmq/connection'

const startServer = async () => {

  connectDB();
  await connectToRabbitMQ();
  await subscribeToMessages('product-exchange', 'user-service-queue', ['product.created', 'product.updated', 'product.deleted']);
  await subscribeToMessages('order-exchange', 'user-service-order-queue', ['order.updated']);

  const PORT = 4000
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
  })
}

startServer().catch(err => {
  console.error('Failed to start the server:', err);
  process.exit(1);
});

