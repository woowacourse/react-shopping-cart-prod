import { API_ENDPOINT } from '../constants/api';
import { Member, OrderData } from '../types';
import { PostOrdersRequestBody } from '../types/api';
import { JsonAPI } from './fetchAPI';

export const getOrderAPI = (baseUrl: string) => {
  const getOrderList = (): Promise<OrderData[]> => JsonAPI.get(`${baseUrl}${API_ENDPOINT.ORDERS}`);

  const getOrder = (orderId: OrderData['id']): Promise<Omit<OrderData, 'id'>> =>
    JsonAPI.get(`${baseUrl}${API_ENDPOINT.ORDERS}/${orderId}`);

  const getMember = (): Promise<Member> => JsonAPI.get(`${baseUrl}${API_ENDPOINT.MEMBER}`);

  const postOrderList = (orderList: PostOrdersRequestBody): Promise<Response> =>
    JsonAPI.post(`${baseUrl}${API_ENDPOINT.ORDERS}`, true, { body: JSON.stringify(orderList) });

  return { getOrderList, getOrder, getMember, postOrderList };
};
