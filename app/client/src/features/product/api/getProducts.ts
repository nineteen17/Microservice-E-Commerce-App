import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { axios } from '@/lib/axios';

import { Product, ProductParams } from '../types';

const getProductParams = async (params: ProductParams): Promise<Product[]> => {
  const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined));

  const query = Object.keys(filteredParams).length > 0 ? `?${new URLSearchParams(filteredParams as Record<string, string>).toString()}` : '';

  try {
    const res = await axios.get(`product-service/${query}`);
    console.log('API Response:', res);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
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
    enabled: true,
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
