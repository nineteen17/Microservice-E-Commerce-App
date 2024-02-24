import mongoose from 'mongoose';

export interface IInventoryTracking {
    orderId?: mongoose.Schema.Types.ObjectId;
    items: Item[];
    createdAt: Date;
}

interface Item {
    productId: mongoose.Schema.Types.ObjectId;
    stockCount: number;
}
const inventoryTrackingSchema = new mongoose.Schema<IInventoryTracking> ({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    stockCount: {
      type: Number,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const InventoryTrackingModel = mongoose.model<IInventoryTracking >('InventoryTracking', inventoryTrackingSchema);