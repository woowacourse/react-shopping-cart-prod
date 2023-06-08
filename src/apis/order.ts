import type { OrderType, ScheduledOrderType } from '../types/product';
import type { HostNameType } from '../types/server';
import type { PointType } from '../types/point';

import { servers } from '../constants/server';

import fetchWithHeaders from '.';

export const api = async (hostName: HostNameType) => {
  const ORDER_URL = `${servers[hostName]}/orders`;
  const POINT_URL = `${servers[hostName]}/points`;

  const getOrders = async () => {
    const response = await fetchWithHeaders(ORDER_URL, 'GET');
    const data: OrderType[] = await response.json();

    return data;
  };

  const getOrderDetail = async (orderId: number) => {
    const response = await fetchWithHeaders(`${ORDER_URL}/${orderId}`, 'GET');
    const data: OrderType = await response.json();

    return data;
  };

  const createOrder = async (order: ScheduledOrderType) => {
    const response = await fetchWithHeaders(ORDER_URL, 'POST', { ...order });
    const location = response.headers.get('location');

    if (location !== null) {
      const lastSlashIndex = location.lastIndexOf('/');
      const orderId = location.slice(lastSlashIndex + 1);
      return orderId;
    }

    return;
  };

  const getPoints = async () => {
    const response = await fetchWithHeaders(POINT_URL, 'GET');
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
