import env from 'dotenv'
env.config()
import app from "./app"
import connectDB from './db'
import { initializeOrderChangeStream } from './streams/OrderChangeStream'
import { subscribeToMessages } from './rabbitmq/subscribe'

const startServer = async () => {

  await connectDB()
  initializeOrderChangeStream()
  await subscribeToMessages('product-exchange', 'product.created', 'product_created_queue');
  await subscribeToMessages('product-exchange', 'product.updated', 'product_updated_queue');
  await subscribeToMessages('product-exchange', 'product.deleted', 'product_deleted_queue');
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

