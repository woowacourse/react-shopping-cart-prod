import { API_ENDPOINT } from '../constants/api';
import type { ProductItemData } from '../types/product';
import { fetchAPI } from './utils/fetchAPI';

const getProductAPI = (baseUrl: string) => {
  const getProductList = (): Promise<ProductItemData[]> => {
    return fetchAPI(`${baseUrl}${API_ENDPOINT.PRODUCTS}`);
  };

  return { getProductList };
};

export { getProductAPI };
