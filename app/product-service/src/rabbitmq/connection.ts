import amqplib, { Connection } from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const amqpUrl: string = process.env.AMQP_URL || 'amqp://localhost'

export const getConnection = async (): Promise<Connection> => {
    return amqplib.connect(amqpUrl);
};
