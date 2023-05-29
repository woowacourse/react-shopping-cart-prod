import { API_ENDPOINT } from '../constants/api';
import { OrderCartItemsData } from '../types/order';
import { fetchAPI } from './utils/fetchAPI';

const postOrder = async (
  baseUrl: string,
  headers: HeadersInit,
  cartItems: OrderCartItemsData[]
): Promise<Response> => {
  const data = {
    cartItems,
  };
  const jsonData = JSON.stringify(data);

  return await fetchAPI(`${baseUrl}${API_ENDPOINT.ORDERS}`, {
    method: 'POST',
    headers,
    body: jsonData,
  });
};

export { postOrder };
