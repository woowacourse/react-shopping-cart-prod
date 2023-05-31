import { servers } from '../constants/server';
import type {
  OrderedData,
  OrderedDetails,
  OrderedProduct,
} from '../types/product';
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

    const data: OrderedProduct[] = await response.json();
    return data;
  };

  const fetchOrderDetailsProduct = async (orderId: string) => {
    const URL = `${servers[hostName]}/orders/${orderId}`;

    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    const data: OrderedDetails = await response.json();
    return data;
  };

  const postOrderProduct = async (orderData: OrderedData) => {
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
    fetchOrderDetailsProduct,
    postOrderProduct,
  };
};
