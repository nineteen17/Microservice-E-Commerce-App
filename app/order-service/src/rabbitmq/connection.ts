import amqplib, { Channel, Connection } from 'amqplib';

const amqpUrl = process.env.AMQP_URL

export const connectToRabbitMQ = async (): Promise<{ connection: Connection; channel: Channel }> => {
  const connection: Connection = await amqplib.connect(amqpUrl);
  const channel: Channel = await connection.createChannel();
  return { connection, channel };
};
