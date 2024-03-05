import { ConsumeMessage } from 'amqplib';
import { connectToRabbitMQ } from './connection';
import { ProductModel } from '../models/product';

const processMessage = async (msg: ConsumeMessage, routingKey: string) => {
    console.log("Received message:", msg.content.toString());
    const messageContent = JSON.parse(msg.content.toString());

    try {
        switch (routingKey) {
            case 'product.created':

                const newProduct = new ProductModel(messageContent);
                await newProduct.save();
                console.log(`Product created: ${newProduct}`);
                break;

            case 'product.updated':

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                    messageContent._id,
                    messageContent,
                    { new: true, runValidators: true }
                );
                if (updatedProduct) {
                    console.log(`Product updated: ${updatedProduct}`);
                } else {
                    console.log('Product not found for update');
                }
                break;

            case 'product.deleted':
                const productId = messageContent;
                const deleteProduct = await ProductModel.findByIdAndDelete(productId);
            
                if (deleteProduct) {
                    console.log(`Product deleted: ${deleteProduct}`);
                    console.log(`Product ${productId} removed from all user watchlists`);
                } else {
                    console.log('Product could not be deleted');
                }
                break;

            default:
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