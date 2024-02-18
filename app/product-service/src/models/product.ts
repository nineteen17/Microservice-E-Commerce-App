import mongoose from 'mongoose'

interface IProduct {
    id?: number;
    name: string;
    brand: string;
    type: BeerType;
    alcoholContent: number;
    volume: number;
    price: number;
    description: string;
    imageUrl: string;
    stockLevel: number;
    createdAt: Date;
}
enum BeerType {
    Lager = 'Lager',
    Ale = 'Ale',
    IPA = 'IPA',
  }

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  alcoholContent: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  stockLevel: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    default: Date.now
  }
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)