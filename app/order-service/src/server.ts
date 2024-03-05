import env from 'dotenv'
env.config()
import app from "./app"
import connectDB from './db'
import { subscribeToMessages } from './rabbitmq/subscribe'
import { connectToRabbitMQ } from './rabbitmq/connection'

const startServer = async () => {

  connectDB();
  connectToRabbitMQ();
  await subscribeToMessages('product-exchange', 'order-service-queue', ['product.created', 'product.updated', 'product.deleted']);
  console.log('Subscribed to product queues.');

  const PORT = 4002
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
  })
}

startServer().catch(err => {
  console.error('Failed to start the server:', err);
  process.exit(1);
});

