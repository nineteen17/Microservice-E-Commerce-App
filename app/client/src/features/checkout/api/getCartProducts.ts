import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useCartStore } from "@/stores/cartStore";

const getCartProducts = async (productIds: string[]) => {
  const params = new URLSearchParams({ ids: productIds.join(",") });
  const res = await axios.get(`order-service/products/ids?${params}`);
  console.log("RESPONSE:", res);
  console.log("RESPONSE DATA:", res.data);
  
  return res.data;
};

export const useCartProducts = () => {
  const cartItems = useCartStore((state) => state.items);
  const productIds = cartItems.map((item) => item.itemId);

  return useQuery({
    queryKey: ["cartProducts", productIds],
    queryFn: () => getCartProducts(productIds),
    enabled: productIds.length > 0,
  });
};
