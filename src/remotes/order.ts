import { auth } from '../constants/auth';
import Fetcher from './Fetcher';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { isOrder, isOrders } from '../types/typeGuards';
import { Order } from '../types/order';

export const orderCart = async (
  url: string,
  cartItemIds: number[],
  usePoint: number,
) => {
  const { location } = await Fetcher.fetchNoResponseJSON({
    url,
    auth: `Basic ${auth}`,
    method: 'POST',
    body: JSON.stringify({ cartItemIds, usePoint }),
    errorMessages: ERROR_MESSAGES.submitOrder,
  });

  return location;
};

export const fetchOrders = async (url: string) => {
  const { value } = await Fetcher.fetch<Order[]>({
    url,
    auth: `Basic ${auth}`,
    method: 'GET',
    typeGuard: isOrders,
    errorMessages: ERROR_MESSAGES.getOrders,
  });

  return value;
};

export const fetchOrderDetail = async (url: string) => {
  const { value } = await Fetcher.fetch<Order>({
    url,
    auth: `Basic ${auth}`,
    method: 'GET',
    typeGuard: isOrder,
    errorMessages: ERROR_MESSAGES.getOrderDetail,
  });

  return value;
};
