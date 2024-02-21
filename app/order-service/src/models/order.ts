import mongoose from 'mongoose';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Item {
  productId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Payment {
  method: string;
  transactionId?: string;
  status: 'Paid' | 'Pending' | 'Failed';
  total: number;
}

interface Shipping {
  method: string;
  cost: number;
  address: Address;
  status: 'Pending' | 'Shipped' | 'Delivered';
  trackingNumber?: string;
}

interface OrderDocument extends mongoose.Document {
  customer: {
    customerId: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    address: Address;
  };
  items: Item[];
  payment: Payment;
  shipping: Shipping;
  orderDate: Date;
  estimatedDeliveryDate?: Date;
  status: 'New' | 'Pending' | 'Complete' | 'Cancelled';
}

const orderSchema = new mongoose.Schema<OrderDocument>({
    customer: {
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }],
    payment: {
      method: { type: String, required: true },
      transactionId: String,
      status: { type: String, required: true, enum: ['Paid', 'Pending', 'Failed'] },
      total: { type: Number, required: true },
    },
    shipping: {
      method: { type: String, required: true },
      cost: { type: Number, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      status: { type: String, required: true, enum: ['Pending', 'Shipped', 'Delivered'] },
      trackingNumber: String,
    },
    orderDate: { type: Date, default: Date.now },
    estimatedDeliveryDate: Date,
    status: { type: String, required: true, enum: ['New', 'Pending', 'Complete', 'Cancelled'] },
  }, { timestamps: true });
  
orderSchema.index({ orderDate: 1 }, {
  expireAfterSeconds: 15 * 60, 
  partialFilterExpression: { status: 'Pending' } 
});

export const OrderModel = mongoose.model<OrderDocument>('Order', orderSchema);
