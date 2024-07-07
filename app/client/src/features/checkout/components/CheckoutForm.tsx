import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/container/Container";
import { useCreateOrder } from "../api/createOrder";
import { OrderSchema } from "../schemas";
import { useCartProducts } from "../api/getCartProducts";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { Product } from "../types";
import StripePaymentForm from "./StripePaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51OoKptFr3K1bOmgBe87BK3rCrU9DVMUUCWFMz9R5oW7gcHqgiVmuGrwaLeVHUlI7dtnM7x9TtdUEA9Jc1NEwoN4c00dwYCL6cc"
);
const FIXED_SHIPPING_COST = 10;
const CheckoutForm = () => {
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data: products } = useCartProducts();
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      user: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      },
      products: products || [],
      payment: {
        status: "Pending",
        total: products
          ? products.reduce(
              (acc: string, product: Product) =>
                acc + product.price * product.quantity,
              0
            )
          : 0,
      },
      shipping: {
        method: "",
        cost: 0,
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
        status: "Pending",
      },
      orderDate: new Date(),
      estimatedDeliveryDate: new Date(),
      status: "Pending",
    },
  });

  const onSubmit = async (data: z.infer<typeof OrderSchema>) => {
    if (!paymentIntentId) {
      console.log("Payment intent ID is missing.");
      return;
    }

    // Ensure the payment status is assigned a value that matches the expected type
    const orderData: z.infer<typeof OrderSchema> = {
      ...data,
      payment: {
        ...data.payment,
        transactionId: paymentIntentId,
        status: "Paid" as "Paid" | "Pending" | "Failed", // Explicitly type the status
      },
    };

    // Call your API to create the order
    createOrder(orderData);
  };

  if (isPending) {
    return (
      <Container variant={"narrowConstrainedPadded"}>
        <LoadingSpinner />
      </Container>
    );
  }
  return (
    <Container>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* User Information */}
          <FormField
            control={form.control}
            name="user.firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.firstName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user.lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.lastName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user.phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.phoneNumber?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Address Fields */}
          <FormField
            control={form.control}
            name="user.address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.address?.street?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user.address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.address?.city?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user.address.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.address?.state?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user.address.zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.address?.zipCode?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user.address.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.user?.address?.country?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Stripe Payment Form */}
          <Elements stripe={stripePromise}>
            <StripePaymentForm setPaymentIntentId={setPaymentIntentId} />
          </Elements>

          {/* Shipping Information */}
          <FormField
            control={form.control}
            name="shipping.method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Method</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.shipping?.method?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Shipping Cost</FormLabel>
            <FormControl>
              <p>{FIXED_SHIPPING_COST.toString()} </p>
            </FormControl>
          </FormItem>

          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>
      </Form>
    </Container>
  );
};

export default CheckoutForm;
