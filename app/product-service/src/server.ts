import app from "./app";
import env from 'dotenv';
env.config();
import connectDB  from './db';
import { subscribeToMessages } from './rabbitmq/subscribe';
import { connectToRabbitMQ } from "./rabbitmq/connection";

const startServer = async () => {

    await connectDB();
    await connectToRabbitMQ();
    await subscribeToMessages('order-exchange', 'product-service-order-queue', ['order.updated']);
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

startServer().catch(err => {
    console.error('Failed to start the server:', err);
    process.exit(1);
});
