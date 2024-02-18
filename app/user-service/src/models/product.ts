import mongoose from "mongoose";

export interface IProduct {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    stockLevel: number;
}

const productSchema = new mongoose.Schema<IProduct>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    stockLevel: { // to track if the item is in stock
        type: Number,
        required: true,
        default: 0
    }
});

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);