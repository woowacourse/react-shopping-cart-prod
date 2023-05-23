import { Product } from '../types/products';
import { fetchQuery, FetchQueryRes } from './api';

interface FetchProductDataRes {
  items: Product[];
}

export const fetchProductData =
  async (): FetchQueryRes<FetchProductDataRes> => {
    const data = await fetchQuery.get<FetchProductDataRes>('/products');

    return data;
  };
