import { Channel, ConsumeMessage } from 'amqplib';
import { connectToRabbitMQ } from './connection';

const processMessage = (msg: ConsumeMessage) => {
    console.log("Received message:", msg.content.toString());
    const messageContent = JSON.parse(msg.content.toString());
    const userId = messageContent.userId;
       console.log(`Received userId: ${userId}`);
};

export const subscribeToMessagesTest = async (exchange: string, routingKey: string, queueName: string): Promise<void> => {
    const { connection, channel } = await connectToRabbitMQ();

    await channel.assertExchange(exchange, 'topic', { durable: false });
    const q = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(q.queue, exchange, routingKey);

    channel.consume(q.queue, (msg) => {
        if (msg !== null) {
            processMessage(msg);
            channel.ack(msg);
        }
    });

    console.log(`Subscribed to ${q.queue}`);
    // Note: Consider how and where to handle channel and connection cleanup
};
