import { API_ENDPOINT, CART_FETCH_OPTION_HEADERS } from '../constants/api';
import { Member, OrderData } from '../types';
import { PostOrdersRequestBody } from '../types/api';
import { fetchAPI } from './fetchAPI';

export const getOrderAPI = (baseUrl: string) => {
  const getOrderList = async (): Promise<OrderData[]> => {
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

  const getMember = async (): Promise<Member> => {
    return await fetchAPI(`${baseUrl}${API_ENDPOINT.MEMBER}`, {
      method: 'GET',
      headers: { ...CART_FETCH_OPTION_HEADERS },
    });
  };

  const postOrderList = async (orderList: PostOrdersRequestBody): Promise<Response> => {
    const jsonData = JSON.stringify(orderList);

    return await fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}`, {
      method: 'POST',
      headers: { ...CART_FETCH_OPTION_HEADERS },
      body: jsonData,
    });
  };

  return { getOrderList, getOrder, getMember, postOrderList };
};
