import Fetcher from './Fetcher';
import { isProducts } from '../types/typeGuards';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { Product } from '../types/product';

export const fetchProducts = async (url: string) => {
  const { value } = await Fetcher.fetch<Product[]>({
    url,
    method: 'GET',
    typeGuard: isProducts,
    errorMessages: ERROR_MESSAGES.getProduct,
  });

  return value;
};
