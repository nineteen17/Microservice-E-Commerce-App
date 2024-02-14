import mongoose from 'mongoose';

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  watchlist?: Array<{
    productId: mongoose.Schema.Types.ObjectId;
    addedAt: Date;
  }>;
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
  watchlist: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    addedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export const UserModel = mongoose.model<IUser>('User', userSchema);
