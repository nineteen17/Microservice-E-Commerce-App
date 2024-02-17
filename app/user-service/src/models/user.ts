import mongoose from 'mongoose';
import { IProduct } from './product';

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  watchlist?: IProduct[];
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true, 
    unique: true,
  },
  password: {
    type: String,
    required: true, // Always required, since Google sign-in is removed
  },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

export const UserModel = mongoose.model<IUser>('User', userSchema);
