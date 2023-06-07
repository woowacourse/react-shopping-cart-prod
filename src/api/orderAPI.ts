import { API_ENDPOINT, AUTHORIZED_FETCH_OPTION_HEADERS } from '../constants/api';
import type { OrderCartItemsData, OrderData } from '../types/order';
import { fetchAPI } from './utils/fetchAPI';

const getOrderAPI = (baseUrl: string) => {
  const getOrderList = (): Promise<OrderData[]> => {
    return fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}`, {
      method: 'GET',
      headers: { Authorization: AUTHORIZED_FETCH_OPTION_HEADERS.Authorization },
    });
  };

  const getOrderDetail = (orderId: number): Promise<OrderData> => {
    return fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}/${orderId}`, {
      method: 'GET',
      headers: { Authorization: AUTHORIZED_FETCH_OPTION_HEADERS.Authorization },
    });
  };

  const postOrder = (cartItemsData: OrderCartItemsData): Promise<Response> => {
    const data = {
      ...cartItemsData,
    };
    const jsonData = JSON.stringify(data);

    return fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}`, {
      method: 'POST',
      headers: AUTHORIZED_FETCH_OPTION_HEADERS,
      body: jsonData,
    });
  };

  return { getOrderList, getOrderDetail, postOrder };
};

export { getOrderAPI };
