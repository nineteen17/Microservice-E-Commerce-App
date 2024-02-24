import mongoose from 'mongoose';
import { OrderDocument, OrderModel } from '../models/order';
import { ProductModel } from '../models/product';
import { InventoryTrackingModel, IInventoryTracking } from '../models/inventoryTracking';
import { OrderSchema } from "../schemas/orderSchema";
import z from 'zod';

type OrderData = z.infer<typeof OrderSchema>;

const deductStockAndCreateTrackingRecords = async (items: OrderData['items'], session: mongoose.ClientSession): Promise<IInventoryTracking[]> => {
  const inventoryTrackingRecords: IInventoryTracking[] = [];

  for (const item of items) {
    const product = await ProductModel.findById(item.productId).session(session);
    if (!product || product.stockLevel < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.productId}`);
    }

    product.stockLevel -= item.quantity;
    await product.save({ session });

    const trackingRecord: IInventoryTracking = {
      orderId: undefined,
      items: [{
        productId: product._id,
        stockCount: item.quantity
      }],
      createdAt: new Date(),
    };

    inventoryTrackingRecords.push(trackingRecord);
  }

  return inventoryTrackingRecords;
};


const createOrderWithInventoryCheck = async (rawOrderData: any): Promise<OrderDocument> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const orderData: OrderData = OrderSchema.parse(rawOrderData);
    const order = await new OrderModel(orderData).save({ session });

    const inventoryTrackingRecords = await deductStockAndCreateTrackingRecords(orderData.items, session);

    inventoryTrackingRecords.forEach(async (record) => {
      record.orderId = order._id;
      await new InventoryTrackingModel(record).save({ session });
    });

    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export { createOrderWithInventoryCheck };
