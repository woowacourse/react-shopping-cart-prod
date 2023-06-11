import { API_ENDPOINT } from '../constants/api';
import { ProductItemData } from '../types';
import { JsonAPI } from './fetchAPI';

const getProductList = async (baseUrl: string): Promise<ProductItemData[]> =>
  JsonAPI.get(`${baseUrl}${API_ENDPOINT.PRODUCTS}`);

export { getProductList };
