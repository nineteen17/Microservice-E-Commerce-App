import app from "./app";
import env from 'dotenv';
import connectDB  from './db';
import { subscribeToMessages } from './rabbitmq/subscribe';

const startServer = async () => {
    env.config();

    if (!process.env.DATABASE_URI) {
        console.error('Missing mandatory environment variable: DATABASE_URI');
        process.exit(1);
    }

    await connectDB();
    await subscribeToMessages('user-exchange', 'user-message', 'user-queue');

    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

startServer().catch(err => {
    console.error('Failed to start the server:', err);
    process.exit(1);
});
