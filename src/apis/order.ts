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
