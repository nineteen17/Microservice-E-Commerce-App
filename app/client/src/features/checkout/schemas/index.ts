import { z } from "zod";

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

const productSchema = z.object({
  productId: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const PaymentSchema = z.object({
  transactionId: z.string(),
  status: z.enum(["Paid", "Pending", "Failed"]),
  total: z.number().positive(),
});

const ShippingSchema = z.object({
  method: z.string(),
  cost: z.number().positive(),
  address: AddressSchema,
  status: z.enum(["Pending", "Shipped", "Delivered"]),
  trackingNumber: z.string().optional(),
});

const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string().optional(),
  address: AddressSchema,
});

export const OrderSchema = z.object({
  user: UserSchema,
  products: z.array(productSchema),
  payment: PaymentSchema,
  shipping: ShippingSchema,
  orderDate: z.date().optional(),
  estimatedDeliveryDate: z.date().optional(),
  status: z.enum(["Pending", "Complete", "Cancelled"]).optional(),
});
