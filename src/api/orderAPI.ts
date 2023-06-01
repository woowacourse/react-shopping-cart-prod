import { API_ENDPOINT, CART_FETCH_OPTION_HEADERS } from '../constants/api';
import { CartPriceData, OrderData } from '../types';
import { fetchAPI } from './fetchAPI';

export const getOrderAPI = (baseUrl: string) => {
  const getOrderList = async (): Promise<CartPriceData> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}`, {
      method: 'GET',
      headers: { ...CART_FETCH_OPTION_HEADERS },
    });
  };

  const getOrder = async (orderId: OrderData['id']): Promise<Omit<OrderData, 'id'>> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}/${orderId}`, {
      method: 'GET',
      headers: { ...CART_FETCH_OPTION_HEADERS },
    });
  };
};
