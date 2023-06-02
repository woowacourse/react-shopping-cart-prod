import { Order } from '../types/order';
import { waitFor, WaitForOptions } from '../utils/waitFor';
import { authFetchQuery } from './api';

export interface FetchOrdersRes {
  orders: Order[];
}

export const fetchOrders = async (options?: WaitForOptions<FetchOrdersRes>) => {
  const promise = authFetchQuery.get<FetchOrdersRes>(`/orders`);
  const { data } = await waitFor(promise, options);

  return data;
};

export interface FetchOrdersReq {
  id: Order['orderId'];
}

export type FetchOrderRes = Order;

export const fetchOrder = async (
  { id }: FetchOrdersReq,
  options?: WaitForOptions<FetchOrderRes>
) => {
  const promise = authFetchQuery.get<FetchOrderRes>(`/orders/${id}`);
  const { data } = await waitFor(promise, options);

  return data;
};
