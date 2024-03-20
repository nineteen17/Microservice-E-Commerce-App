import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/features/product/types";
import { Trash, Plus, Minus } from "lucide-react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

interface DisplayCart {
  itemId: string;
  product: Product[];
}

const CartCard = ({ itemId, product }: DisplayCart) => {
  const { addItem, updateQuantity, removeItem } = useCartStore();
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.itemId === itemId)
  );
  const item = product.find((p) => p._id === itemId);

  return (
    <div>
      <Card>
        <CardHeader>
          <Table>
            <TableRow className="flex flex-row">
              <TableCell className="flex-1 flex items-center">{item ? item.name : <LoadingSpinner />}</TableCell>
              <TableCell className="flex-1 hidden md:flex items-center">Price</TableCell>
              <TableCell className="flex-1 flex items-center">Quantity</TableCell>
              <TableCell className="flex-1 flex items-center">Amount</TableCell>
            </TableRow>
          </Table>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow className="flex flex-row">
                <TableCell className="flex-1 flex items-center">
                  <img
                    src={item ? item.imageUrl : "https://via.placeholder.com/150"}
                    alt={item ? item.name : "Loading..."}
                    className="w-32 h-32 object-cover"
                  />
                </TableCell>
                <TableCell className="flex-1 hidden md:flex items-center">{item ? `$${item.price}` : <LoadingSpinner />}</TableCell>
                <TableCell className="flex-1 flex items-center">
                  <div className="flex">
                    <Minus
                      className="cursor-pointer"
                      onClick={() =>
                        cartItem &&
                        updateQuantity(
                          itemId,
                          Math.max(1, cartItem.quantity - 1)
                        )
                      }
                    />
                    <div className="mx-2">{cartItem?.quantity ?? 0}</div>
                    <Plus
                      className="cursor-pointer"
                      onClick={() => addItem({ itemId, quantity: 1 })}
                    />
                    <Trash
                      className="cursor-pointer ml-2"
                      onClick={() => removeItem(itemId)}
                    />
                  </div>
                </TableCell>
                <TableCell className="flex-1 flex items-center">
                  {item && cartItem
                    ? `$${(item.price * cartItem.quantity).toFixed(2)}`
                    : <LoadingSpinner />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartCard;
