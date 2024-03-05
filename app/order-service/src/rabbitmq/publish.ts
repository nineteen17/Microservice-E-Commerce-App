import { connectToRabbitMQ } from "./connection";

export const publishMessage = async (exchange: string, routingKey: string, messagePayload: Object): Promise<void> => {
    const {connection, channel} = await connectToRabbitMQ();
    console.log('RabbitMQ Connected and Channel Created');

    try {

      await channel.assertExchange(exchange, 'topic', { durable: true });
      console.log('Exchange Asserted');
  
      channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(messagePayload)));
      console.log('Message Published');
  
    } catch (error) {
      console.error('Failed to publish message:', error);
      throw error;
    } finally {
      if (channel) await channel.close();
      if (connection) await connection.close();
    }
  };
