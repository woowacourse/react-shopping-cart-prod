import type { FetchProductDataRes, FetchQueryRes } from './api.type';
import { fetchQuery } from './api';

export const fetchProductData =
  async (): FetchQueryRes<FetchProductDataRes> => {
    return fetchQuery.get<FetchProductDataRes>('/products');
  };
