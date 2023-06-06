import type { OrderDetailType, OrderType, ServerNameType } from '../types';

import fetcher from '../utils/fetcher';

export const getOrders = (serverName: ServerNameType, token: string): Promise<OrderType[]> =>
  fetcher(serverName, token)('GET', 'orders');

export const getOrder = (
  serverName: ServerNameType,
  token: string,
  orderId: number
): Promise<OrderDetailType> => fetcher(serverName, token)('GET', `orders/${orderId}`);

interface OrderRequestItemType {
  productId: number;
  quantity: number;
}

export const postOrder = (
  serverName: ServerNameType,
  token: string,
  items: OrderRequestItemType[],
  couponId: number | null
) => {
  fetcher(serverName, token)('POST', 'orders', { items, couponId });
};
