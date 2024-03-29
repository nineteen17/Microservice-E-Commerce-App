import { Container } from "@/components/container/Container";
import { Card } from "@/components/ui/card";
import React from "react";
import { useProductParams } from "../api/getProducts";
import { useSearchParams } from "react-router-dom";
import { Product, ProductParams } from "../types";
import { ProductSkeleton } from "@/components/skeleton/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";

const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const params: ProductParams = {
    term: searchParams.get("term") || undefined,
    name: searchParams.get("name") || undefined,
    brand: searchParams.get("brand") || undefined,
    type: searchParams.get("type") || undefined,
    volume: searchParams.get("volume")
      ? Number(searchParams.get("volume"))
      : undefined,
    price: searchParams.get("price")
      ? Number(searchParams.get("price"))
      : undefined,
    alcoholContent: searchParams.get("alcoholContent")
      ? Number(searchParams.get("alcoholContent"))
      : undefined,
    sort: searchParams.get("sort") || undefined,
  };

  const { data, isLoading, error } = useProductParams(params);
  const { addItem } = useCartStore();
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );

  const handleAddToCart = (product: Product) => () => {
    if (product._id) {
      addItem({ itemId: product._id, quantity: 1 });
      addNotification({
        type: "success",
        title: "Product Added",
        message: `You have successfully added "${product.name}" to your cart.`,
      });
    } else {
      addNotification({
        type: "error",
        title: "Error",
        message: "Unable to add product to cart.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <Container variant="breakpointPadded" className="flex justify-center">
        <div>No Products Found</div>
      </Container>
    );
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <Container variant="breakpointPadded" className="bg-green-300 p-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-indigo-400">
        {data?.map((product) => (
          <Card key={product._id} className="flex flex-col items-center ">
            <h2 className="text-lg font-semibold text-center w-full bg-orange-400 rounded-t-lg truncate">
              {product.name}
            </h2>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover h-49 w-full "
            />
            <p className="text-sm text-center w-full bg-white font-semibold font-mono ">
              ${product.price}
            </p>
            <div className="flex flex-row justify-evenly items-center w-full px-2 py-1 bg-white rounded-b-lg  ">
              <Button variant={"secondary"} onClick={handleAddToCart(product)}>
                Add To Cart
              </Button>
              <Heart color="red" fill="red" />
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
