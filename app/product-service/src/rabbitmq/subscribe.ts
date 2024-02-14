import { Channel, ConsumeMessage } from 'amqplib';
import { getConnection } from './connection';

const processMessage = (msg: ConsumeMessage) => {
    console.log("Received message:", msg.content.toString());
    const messageContent = JSON.parse(msg.content.toString());
    const userId = messageContent.userId;
       console.log(`Received userId: ${userId}`);
};

export const subscribeToMessages = async (exchange: string, routingKey: string, queueName: string): Promise<void> => {
    const connection = await getConnection();
    const channel: Channel = await connection.createChannel();

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
