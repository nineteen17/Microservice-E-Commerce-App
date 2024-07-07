import { Container } from "@/components/container/Container";
import CheckoutForm from "../components/CheckoutForm";
import Summary from "../components/Summary";

const Checkout = () => {
  return (
    <Container variant={"fullWidth"} className="flex flex-row justify-evenly">
      <CheckoutForm />
      <Summary />
    </Container>
  );
};

export default Checkout;
