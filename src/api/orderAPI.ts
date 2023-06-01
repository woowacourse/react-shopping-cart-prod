import { API_ENDPOINT, CART_FETCH_OPTION_HEADERS } from '../constants/api';
import { CartPriceData } from '../types';
import { fetchAPI } from './fetchAPI';

export const getOrderAPI = (baseUrl: string) => {
  const getOrderList = async (): Promise<CartPriceData> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}`, {
      method: 'GET',
      headers: { ...CART_FETCH_OPTION_HEADERS },
    });
  };
};
