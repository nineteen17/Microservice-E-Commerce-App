interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Product {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Payment {
  transactionId?: string;
  status: "Paid" | "Pending" | "Failed";
  total: number;
}

interface Shipping {
  method: string;
  cost: number;
  address: Address;
  status: "Pending" | "Shipped" | "Delivered";
}

interface User {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address: Address;
}

export interface Order {
  user: User;
  products: Product[];
  payment: Payment;
  shipping: Shipping;
  status?: "Pending" | "Complete" | "Cancelled";
}
