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
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Payment {
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

export interface OrderDocument extends mongoose.Document {
  user: {
    userId: mongoose.Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: String;
    address: Address;
  };
  items: Item[];
  payment: Payment;
  shipping: Shipping;
  orderDate: Date;
  status: 'Pending' | 'Complete' | 'Cancelled';
}

const orderSchema = new mongoose.Schema<OrderDocument>({
    user: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: String,
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
      imageUrl: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }],
    payment: {
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
    status: { type: String, required: true, enum: ['Pending', 'Complete', 'Cancelled'], default: 'Pending' },
  }, { timestamps: true });
  

export const OrderModel = mongoose.model<OrderDocument>('Order', orderSchema);
