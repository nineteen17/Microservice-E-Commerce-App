import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { axios } from '@/lib/axios';

import { Product, ProductParams } from '../types';

const getProductParams = async (params: ProductParams): Promise<Product[]> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  
  try {
      const res = await axios.get(`product-service/${query}`);
      console.log('API Response:', res);
      console.log("hello world");
      
      return res.data;
  } catch (error) {
      console.error('API Error:', error);
      throw error; // Rethrow the error to be handled by React Query
  }
};



type GetProductParamsType = typeof getProductParams;

export const useProductParams = (params?: ProductParams, config?: QueryConfig<GetProductParamsType>) => {
    return useQuery<ExtractFnReturnType<GetProductParamsType>>({
      ...config,
      queryKey: ['searchAndFilterProducts', params],
      queryFn: () => {
        const result = getProductParams(params || {});
        console.log('Query Function Result:', result);
        return result;
      },
  });
};



const getProductById = async (ProductId: string): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`product-service/${ProductId}`);
  return res.data;
};

type GetProductIdType = typeof getProductById;

export const useGetProductById = (ProductId: string, config?: QueryConfig<GetProductIdType>) => {
  return useQuery<ExtractFnReturnType<GetProductIdType>>({
    ...config,
    queryKey: ['product', ProductId],
    queryFn: () => getProductById(ProductId),
  });
};
