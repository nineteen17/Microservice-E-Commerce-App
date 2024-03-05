import { ConsumeMessage } from 'amqplib';
import { connectToRabbitMQ } from './connection';
import { ProductModel } from '../models/product';

const processMessage = async (msg: ConsumeMessage, routingKey: string) => {
    console.log("Received message:", msg.content.toString());
    const messageContent = JSON.parse(msg.content.toString());

    try {
        if (routingKey === 'order.updated') {
            const { items } = messageContent;
            for (const { productId, quantityDeducted } of items) {
                const product = await ProductModel.findById(productId);
                if (product) {
                    product.stockLevel -= quantityDeducted;
                    await product.save();
                    console.log(`Updated stock level for product ${productId} to ${product.stockLevel}`);
                }
            }
        } else {
            console.log(`Unhandled routing key: ${routingKey}`);
        }
    } catch (error) {
        console.error(`Error processing message with routing key ${routingKey}:`, error);
    }
};

export const subscribeToMessages = async (exchange: string, queueName: string, routingKeys: string[]): Promise<void> => {
    try {
        const { channel } = await connectToRabbitMQ();

        await channel.assertExchange(exchange, 'topic', { durable: true });
        console.log(`Exchange "${exchange}" asserted.`);
        
        const q = await channel.assertQueue(queueName, { durable: true });
        console.log(`Queue "${queueName}" asserted.`);

        for (const routingKey of routingKeys) {
            await channel.bindQueue(q.queue, exchange, routingKey);
            console.log(`Queue "${queueName}" bound to exchange "${exchange}" with routing key "${routingKey}".`);
        }

        channel.consume(q.queue, async (msg) => {
            if (msg !== null) {
                try {
                    await processMessage(msg, msg.fields.routingKey);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            }
        }, { noAck: false });

        console.log(`Subscribed to ${q.queue}`);
    } catch (error) {
        console.error(`Failed to subscribe to messages: ${error}`);
    }
};
