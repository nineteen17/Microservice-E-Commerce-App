import mongoose from 'mongoose';
import { OrderDocument, OrderModel } from '../models/order';
import { ProductModel } from '../models/product';
import { OrderSchema } from "../schemas/orderSchema";
import z from 'zod';
import Stripe from 'stripe';
import env from 'dotenv';
env.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

type OrderData = z.infer<typeof OrderSchema>;

const checkAndDeductStock = async (items: OrderData['items'], session: mongoose.ClientSession) => {
  const tasks = items.map(async (item) => {
    const product = await ProductModel.findById(item.productId).session(session);
    if (!product || product.stockLevel < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.productId}`);
    }

    product.stockLevel -= item.quantity;
    await product.save({ session });
  });

  await Promise.all(tasks);
};

const createStripeCheckoutSession = async (orderData: OrderData) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      ...orderData.items.map(item => ({
        price_data: {
          currency: 'nzd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: 'nzd',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: orderData.shipping.cost * 100,
        },
        quantity: 1,
      }
    ],
    mode: 'payment',
    success_url: 'http://nineteen17dns.com/checkout-success',
    cancel_url: 'http://nineteen17dns.com/checkout-cancel',
  });
  
  return session;
};

export const updateOrderStatus = async (orderId: string, status: 'Pending' | 'Complete' | 'Cancelled') => {
  await OrderModel.findByIdAndUpdate(orderId, { status });
};

const rollbackInventory = async (items: OrderData['items'], session: mongoose.ClientSession) => {
  await Promise.all(items.map(async (item) => {
    await ProductModel.updateOne(
      { _id: item.productId },
      { $inc: { stockLevel: item.quantity } },
      { session }
    );
  }));
};

export const createOrderService = async (rawOrderData: any): Promise<{ order: OrderDocument, checkoutSessionUrl: string }> => {
  const session = await mongoose.startSession();
  let orderData: OrderData = OrderSchema.parse(rawOrderData);

  try {
    await session.startTransaction();

    // Check and deduct stock before creating the checkout session
    await checkAndDeductStock(orderData.items, session);

    // Create Stripe Checkout session
    const stripeSession = await createStripeCheckoutSession(orderData);

    const order = new OrderModel({ ...orderData, payment: { ...orderData.payment, transactionId: stripeSession.id, status: 'Pending' } });
    await order.save({ session });

    await session.commitTransaction();

    if (!stripeSession.url) {
      throw new Error('Failed to create Stripe checkout session.');
    }
    
    return { order, checkoutSessionUrl: stripeSession.url };    
  } catch (error) {
    console.error("An error occurred:", error);

    if (orderData && orderData.items) {
      await rollbackInventory(orderData.items, session);
    }
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
