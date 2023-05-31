import { api } from 'api';
import { ProductItem } from 'types/api/products';

export const getProductList = async (
  server: string
): Promise<ProductItem[]> => {
  const data = await api.get(`${server}/products`);
  return data;
};
