import type { OrderType, ScheduledOrderType } from '../types/product';
import type { HostNameType } from '../types/server';
import type { PointType } from '../types/point';

import { servers } from '../constants/server';
import base64 from './auth';

export const api = async (hostName: HostNameType) => {
  const ORDER_URL = `${servers[hostName]}/orders`;
  const POINT_URL = `${servers[hostName]}/points`;
  const getOrders = async () => {
    const response = await fetch(ORDER_URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    const data: OrderType[] = await response.json();

    return data;
  };

  const getOrderDetail = async (orderId: number) => {
    const response = await fetch(`${ORDER_URL}/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const data: OrderType = await response.json();

    return data;
  };

  const createOrder = async (order: ScheduledOrderType) => {
    const response = await fetch(ORDER_URL, {
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

  const getPoints = async () => {
    const response = await fetch(POINT_URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const data: PointType = await response.json();
    return data;
  };

  return {
    getOrders,
    getOrderDetail,
    createOrder,
    getPoints,
  };
};
