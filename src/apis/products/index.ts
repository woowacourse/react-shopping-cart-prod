import api from 'apis';
import { Product } from 'types/product';

const URL = '/products';

export const getProducts = async (): Promise<Product[]> => {
  const { data: products } = await api.get<Product[]>(URL);

  return products;
};
