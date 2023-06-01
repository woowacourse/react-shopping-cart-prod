import { servers } from '../constants/server';
import { fetchData, postData } from '../utils/apiUtils';
import type { OrderedData, OrderedProduct } from '../types/product';
import type { HostNameType } from '../types/server';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const orderApi = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/orders`;

  const fetchOrderProducts = async () => {
    const response: OrderedProduct[] = await fetchData<OrderedProduct[]>(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    return response;
  };

  const fetchOrderDetailsProduct = async (orderId: string) => {
    const URL = `${servers[hostName]}/orders/${orderId}`;

    const response: OrderedProduct = await fetchData<OrderedProduct>(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    return response;
  };

  const postOrderProduct = async (orderData: OrderedData) => {
    const headers = {
      Authorization: `Basic ${base64}`,
    };

    const response = await postData(URL, headers, { orderData });
    return response;
  };

  return {
    fetchOrderProducts,
    fetchOrderDetailsProduct,
    postOrderProduct,
  };
};
