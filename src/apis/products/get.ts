import fetcher from 'apis';
import { Product } from 'types/product';

const GET_URL = '/products';

export const getProducts = async (): Promise<Product[]> => {
  const data = await fetcher<Product[]>(GET_URL);
  const products = data.data ?? [];

  return products;
};
