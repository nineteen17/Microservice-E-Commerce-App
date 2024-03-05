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

const deductStockAndCreateTrackingRecords = async (items: OrderData['items'], session: mongoose.ClientSession) => {
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

const preAuthorizePayment = async (amount: number, paymentMethodId: string, customerId: string): Promise<string> => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'nzd',
    customer: customerId,
    payment_method: paymentMethodId,
    confirmation_method: 'manual',
    confirm: true,
    capture_method: 'manual',
    return_url: 'http://nineteen17dns.com/success'
  });

  if (paymentIntent.status !== 'requires_capture') {
    throw new Error('Payment pre-authorization failed');
  }

  return paymentIntent.id;
};


const capturePayment = async (paymentIntentId: string): Promise<void> => {
  const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
  if (paymentIntent.status !== 'succeeded') {
    throw new Error('Payment capture failed');
  }
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


export const updateOrderStatus = async (orderId: string, status: string) => {
  await OrderModel.findByIdAndUpdate(orderId, { status });
};

export const createOrderService = async (rawOrderData: any): Promise<OrderDocument> => {
  const session = await mongoose.startSession();
  let orderData: OrderData = OrderSchema.parse(rawOrderData);

  try {
    await session.startTransaction();
    const totalAmountInDollars = orderData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalAmountInCents = Math.round(totalAmountInDollars * 100); // Convert to cents

    // Create a Customer in Stripe with the email from orderData
    const customer = await stripe.customers.create({
      email: orderData.user.email,
    });

    // Attach the PaymentMethod to the Customer
    await stripe.paymentMethods.attach(orderData.payment.method, {
      customer: customer.id,
    });

    // Create and confirm the PaymentIntent with the Customer and PaymentMethod
    const paymentIntentId = await preAuthorizePayment(totalAmountInCents, orderData.payment.method, customer.id);

    await deductStockAndCreateTrackingRecords(orderData.items, session);

    await capturePayment(paymentIntentId);

    const order = new OrderModel({ ...orderData, payment: { ...orderData.payment, transactionId: paymentIntentId, status: 'Pending' } });
    await order.save({ session });

    await session.commitTransaction();
    return order;
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
