import mongoose from 'mongoose';
import { ProductModel } from '../models/product';
import { InventoryTrackingModel } from '../models/inventoryTracking';

const rollbackInventoryForExpiredOrder = async (orderId: mongoose.Types.ObjectId) => {
  const inventoryTracking = await InventoryTrackingModel.findOne({ orderId }).exec();

  if (inventoryTracking) {
    const updatePromises = inventoryTracking.items.map(item =>
      ProductModel.updateOne(
        { _id: item.productId },
        { $inc: { stockLevel: item.stockCount } } // Ensure the field name matches your schema
      )
    );

    await Promise.all(updatePromises);

    // Delete the inventory tracking document to clean up
    await InventoryTrackingModel.deleteOne({ orderId });
  }
};

export const initializeOrderChangeStream = () => {
  const pipeline = [{ $match: { operationType: 'delete' } }];
  const changeStream = mongoose.model('Order').watch(pipeline);

  changeStream.on('change', async (change) => {
    if (change.operationType === 'delete') {
      const orderId = change.documentKey._id;
      await rollbackInventoryForExpiredOrder(new mongoose.Types.ObjectId(orderId)); // Convert string to ObjectId
    }
  });

  changeStream.on('error', (error) => {
    console.error('Error in Order Change Stream:', error);
  });
};
