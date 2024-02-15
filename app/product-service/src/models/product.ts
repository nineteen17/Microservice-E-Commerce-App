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
  type: { // e.g., Lager, Ale, Stout, IPA, etc.
    type: String,
    required: true,
    trim: true
  },
  alcoholContent: { // as a percentage
    type: Number,
    required: true
  },
  volume: { // in milliliters (ml)
    type: Number,
    required: true
  },
  price: { // assuming price is in a single currency; adjust accordingly
    type: Number,
    required: true
  },
  description: { // a short description of the beer
    type: String,
    required: true
  },
  imageUrl: { // URL to an image of the beer
    type: String,
    required: false // not making it required as not all products may have an image initially
  },
  stockLevel: { // to track if the item is in stock
    type: Number,
    required: true,
    default: 0
  },
  createdAt: { // to record when the product was added
    type: Date,
    default: Date.now
  }
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)