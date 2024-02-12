import mongoose from 'mongoose';

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  googleId?: string;
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
    unique: true,
    sparse: true,    // Allows for null values in case of OAuth sign-ups without an email
  },
  password: {
    type: String,
    required: function() { return !this.googleId; },  // Required if no googleId present
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,   // Allows for null values in case of traditional email sign-ups
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
