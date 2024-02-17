import amqplib, { Channel, Connection } from 'amqplib';

const amqpUrl: string = 'amqp://rabbitmq:5672'
; 

// Separate function to handle RabbitMQ connection
export const connectToRabbitMQ = async (): Promise<{ connection: Connection; channel: Channel }> => {
  const connection: Connection = await amqplib.connect(amqpUrl);
  const channel: Channel = await connection.createChannel();
  return { connection, channel };
};