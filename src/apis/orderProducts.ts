import { servers } from '../constants/server';
import type { OrderData, OrderDetails } from '../types/product';
import type { HostNameType } from '../types/server';

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const base64 = btoa(email + ':' + password);

export const orderApi = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/orders`;

  const fetchOrderProducts = async () => {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    const data: OrderDetails[] = await response.json();
    return data;
  };

  const postOrderProduct = async (orderData: OrderData) => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const location = response.headers.get('location');

    if (location !== null) {
      const lastSlashIndex = location.lastIndexOf('/');
      const orderId = location.slice(lastSlashIndex + 1);
      return orderId;
    }
  };

  return {
    fetchOrderProducts,
    postOrderProduct,
  };
};
