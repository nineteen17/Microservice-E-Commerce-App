import amqplib, { Channel, Connection } from 'amqplib';

const amqpUrl: string = 'amqp://rabbitmq:5672'
; 

// Separate function to handle RabbitMQ connection
export const connectToRabbitMQ = async (): Promise<{ connection: Connection; channel: Channel }> => {
  const connection: Connection = await amqplib.connect(amqpUrl);
  const channel: Channel = await connection.createChannel();
  return { connection, channel };
};

// Function to publish a message
export const publishMessage = async (exchange: string, routingKey: string, messagePayload: Object): Promise<void> => {
  let connection: Connection | null = null;
  let channel: Channel | null = null;
  try {
    ({ connection, channel } = await connectToRabbitMQ());
    console.log('RabbitMQ Connected and Channel Created');

    await channel.assertExchange(exchange, 'topic', { durable: true });
    console.log('Exchange Asserted');

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(messagePayload)));
    console.log('Message Published');

  } catch (error) {
    console.error('Failed to publish message:', error);
    throw error; // Rethrow the error to handle it in the calling function
  } finally {
    if (channel) await channel.close();
    if (connection) await connection.close();
  }
};

