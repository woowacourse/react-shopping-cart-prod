import { API_ENDPOINT } from '../constants/api';
import { ProductItemData } from '../types/product';
import { fetchAPI } from './utils/fetchAPI';

const getProductList = async (baseUrl: string): Promise<ProductItemData[]> => {
  return await fetchAPI(`${baseUrl}${API_ENDPOINT.PRODUCTS}`);
};

export { getProductList };
