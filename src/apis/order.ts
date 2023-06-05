import type { Order, ScheduledOrder } from '../types/product';
import type { HostNameType } from '../types/server';

import { servers } from '../constants/server';
import base64 from './auth';

export const api = async (hostName: HostNameType) => {
  const URL = `${servers[hostName]}/orders`;

  const getOrders = async () => {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    const data: Order[] = await response.json();

    return data;
  };

  const getOrderDetail = async (orderId: number) => {
    const response = await fetch(`${URL}/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const data: Order = await response.json();

    return data;
  };

  const createOrder = async (order: ScheduledOrder) => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...order }),
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

    return;
  };

  return {
    getOrders,
    getOrderDetail,
    createOrder,
  };
};
