import amqplib, { Channel, Connection, ConsumeMessage } from 'amqplib';

const amqpUrl: string = 'amqp://rabbitmq:5672';

const processMessage = (msg: ConsumeMessage) => {
    console.log("Received message:", msg.content.toString());
    // Process the message here
};

export const subscribeToMessages = async (exchange: string, routingKey: string, queueName: string): Promise<void> => {
    const connection: Connection = await amqplib.connect(amqpUrl);
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
