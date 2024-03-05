import { Request, Response } from 'express';
import { createOrderService, updateOrderStatus } from '../services/orderService';
import { errorMessage } from '../utils/errorMessage';
import stripe from 'stripe';
import { publishMessage } from '../rabbitmq/publish';
import { OrderModel } from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { order, checkoutSessionUrl } = await createOrderService(req.body);
    res.status(201).json({
      order,
      checkoutSessionUrl,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating order',
      error: errorMessage(error),
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'];

  if (typeof signature !== 'string') {
    console.error('Webhook Error: No signature header found');
    return res.status(400).send('Webhook Error: No signature header found');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${errorMessage(err)}`);
    return res.status(400).send(`Webhook Error: ${errorMessage(err)}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      if (!session.metadata || !session.metadata.orderId) {
        console.error('Session metadata or orderId not found');
        return res.status(400).send('Session metadata or orderId not found');
      }

      await updateOrderStatus(session.metadata.orderId, 'Complete');

      const order = await OrderModel.findById(session.metadata.orderId);
      if (order) {
        const orderUpdatePayload = {
          orderId: order._id,
          items: order.items.map(item => ({
            productId: item.productId,
            updatedStockLevel: item.quantity
          }))
        };
        await publishMessage('order-exchange', 'order.updated', orderUpdatePayload);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
