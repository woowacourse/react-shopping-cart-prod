import type { OrderDetailType, OrderType, ServerNameType } from '../types';

import { BASE_URL_MAP } from '../constants';

export const getOrders = async (
  serverName: ServerNameType,
  token: string
): Promise<OrderType[]> => {
  const url = `${BASE_URL_MAP[serverName]}/orders`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);
  return response.json();
};

export const getOrder = async (
  serverName: ServerNameType,
  token: string,
  orderId: number
): Promise<OrderDetailType> => {
  const url = `${BASE_URL_MAP[serverName]}/orders/${orderId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);
  return response.json();
};

interface OrderRequestItemType {
  productId: number;
  quantity: number;
}

export const postOrder = async (
  serverName: ServerNameType,
  token: string,
  items: OrderRequestItemType[],
  couponId: number | null
) => {
  const url = `${BASE_URL_MAP[serverName]}/orders`;
  const body = JSON.stringify({
    items,
    couponId,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) throw new Error(`${url} POST error`);
};
