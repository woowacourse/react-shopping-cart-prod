import { servers } from '../constants/server';
import { fetchData, postData } from '../utils/apiUtils';
import type { OrderedData, OrderedProduct } from '../types/product';
import type { HostNameType } from '../types/server';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const orderApi = async (hostName: HostNameType) => {
  const BASE_URL = `${servers[hostName]}/orders`;
  const headers = {
    Authorization: `Basic ${base64}`,
  };

  const fetchOrderProducts = async () => {
    const response: OrderedProduct[] = await fetchData<OrderedProduct[]>(
      BASE_URL,
      {
        method: 'GET',
        headers,
      }
    );
    return response;
  };

  const postOrderProduct = async (orderData: OrderedData) => {
    const response = await postData(BASE_URL, headers, { orderData });
    return response;
  };

  const fetchOrderDetailsProduct = async (orderId: string) => {
    const URL = `${BASE_URL}/${orderId}`;

    const response: OrderedProduct = await fetchData<OrderedProduct>(URL, {
      method: 'GET',
      headers,
    });
    return response;
  };

  return {
    fetchOrderProducts,
    postOrderProduct,
    fetchOrderDetailsProduct,
  };
};
