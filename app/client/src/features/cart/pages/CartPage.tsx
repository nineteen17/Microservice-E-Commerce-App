import { Container } from "@/components/container/Container";
import CartList from "../components/CartList";
import Banner from "@/components/banner/Banner";

const Cart = () => {
  return (
    <>
    <Banner image="CART" />
      <Container variant={"constrainedPadded"}>
        <CartList />
      </Container>
    </>
  );
};

export default Cart;
