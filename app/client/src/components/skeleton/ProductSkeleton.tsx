import { Skeleton } from "@/components/skeleton/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="p-4">
      <Skeleton className="h-6 w-3/4 mb-4" /> 
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-4 w-1/4" /> 
    </div>
  );
};

export { ProductSkeleton };
