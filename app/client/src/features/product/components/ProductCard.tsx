import { Container } from '@/components/container/Container';
import { Card } from '@/components/ui/card';
import React from 'react';
import { useProductParams } from '../api/getProducts';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

const ProductCard: React.FC = () => {
  const { data, isLoading, error } = useProductParams();
  console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <Container variant="breakpointPadded" className='bg-green-300'>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((product) => (
          <Card key={product._id} className="flex flex-col items-center bg-indigo-800">
            <h2 className="text-lg font-semibold text-center w-full bg-white">{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} className="object-cover h-49 w-full " />
            <p className="text-sm text-center w-full bg-white">Price: ${product.price}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ProductCard;
