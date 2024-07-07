import { Product } from "@/features/product/types";
import { useCartProducts } from "../api/getCartProducts";

const Summary = () => {
  const { data } = useCartProducts();
  console.log("Summary page data:", data);

  return (
    <div>
      {data.map((product: Product) => (
        <div key={product._id}>
          <div>{product.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Summary;


