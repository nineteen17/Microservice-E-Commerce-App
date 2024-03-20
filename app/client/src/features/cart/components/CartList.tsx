import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import CartCard from "./CartCard";
import { useProductParams } from "@/features/product/api/getProducts";
import { Container } from "@/components/container/Container";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { Button } from "@/components/ui/button";

const CartList = () => {
  const items = useCartStore((state) => state.items);
  const { data, isLoading } = useProductParams();

  const calculateTotalPrice = () => {
    if (!data) return 0;
    return items.reduce((total, item) => {
      const product = data.find((p) => p._id === item.itemId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (items.length === 0) {
    return <Container>Cart is Empty</Container>;
  }

  return (
    <>
      <div className="flex flex-col justify-center bg-green-400 w-full h-full ">
        {items.map((item) => (
          <CartCard
            key={item.itemId}
            itemId={item.itemId}
            product={data || []}
          />
        ))}
      </div>
      <div className="flex flex-row sw-full mt-2 justify-between ">
        <div className="text-lg font-bold">
          Sutotal: ${calculateTotalPrice().toFixed(2)}
        </div>
        <Link to={'/checkout'} >
          <Button>Proceed to Checkout</Button>
        </Link>
      </div>
    </>
  );
};

export default CartList;
