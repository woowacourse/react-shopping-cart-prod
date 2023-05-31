import { Product } from '../types/products';
import { fetchQuery } from './api';
import { FetchQueryRes } from './api.type';

type FetchProductDataRes = Product[];

export const fetchProductData =
  async (): FetchQueryRes<FetchProductDataRes> => {
    return fetchQuery.get<FetchProductDataRes>('/products');
  };
