import { httpRequestWithBase64 } from './http';
import type { OrderPayload } from '../types/order';

export const fetchOrder = async (url: string, base64: string) => {
  const { _get } = httpRequestWithBase64(base64);
  const response = await _get(url);

  if (!response.ok) {
    throw new Error('주문 상세 내역을 불러올 수 없습니다.');
  }

  const order = await response.json();

  return order;
};

export const fetchOrders = async (url: string, base64: string) => {
  const { _get } = httpRequestWithBase64(base64);
  const response = await _get(url);

  if (!response.ok) {
    throw new Error('주문 상세 내역을 불러올 수 없습니다.');
  }

  const orders = await response.json();

  return orders;
};

export const postOrder = async (
  url: string,
  orderPayload: OrderPayload,
  base64: string,
) => {
  const { _post } = httpRequestWithBase64(base64, orderPayload);
  const response = await _post(url);

  if (!response.ok) {
    throw new Error('주문에 실패했습니다.');
  }

  return response;
};
