import { useGetProfile } from "../../api/getProfile";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/container/Container";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const List = () => {
  const { data } = useGetProfile();

  return (
    <Container variant="breakpointPadded" className="bg-green-300 p-6">
      <div className="grid grid-cols-1 gap-4 bg-indigo-400">
        {data?.watchlist?.map((product: any) => (
          <Card key={product._id} className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-center w-full bg-orange-400 rounded-t-lg truncate">
              {product.name}
            </h2>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover h-49 w-full"
            />
            <p className="text-sm text-center w-full bg-white font-semibold font-mono">
              ${product.price}
            </p>
            <div className="flex flex-row justify-evenly items-center w-full px-2 py-1 bg-white rounded-b-lg">
              <Button variant={"secondary"}>Add To Cart</Button>
              <Heart color="red" fill="red" />
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default List;
