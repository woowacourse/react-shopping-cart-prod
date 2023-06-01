import { base64 } from '../constants/auth';
import type { OrderPayload } from '../types/order';

export const fetchOrder = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });

  if (!response.ok) {
    throw new Error('주문 상세 내역을 불러올 수 없습니다.');
  }

  const order = await response.json();

  return order;
};

export const fetchOrders = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });

  if (!response.ok) {
    throw new Error('주문 상세 내역을 불러올 수 없습니다.');
  }

  const orders = await response.json();

  return orders;
};

export const postOrder = async (url: string, orderPayload: OrderPayload) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    throw new Error('주문에 실패했습니다.');
  }

  return response;
};
