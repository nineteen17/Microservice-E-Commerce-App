import amqplib, { Connection, Channel} from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const amqpUrl: string = process.env.AMQP_URL || 'amqp://rabbitmq:5672'

export const connectToRabbitMQ = async (): Promise<{ connection: Connection; channel: Channel }> => {
    const connection: Connection = await amqplib.connect(amqpUrl);
    const channel: Channel = await connection.createChannel();
    return { connection, channel };
};