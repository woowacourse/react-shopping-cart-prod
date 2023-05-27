import { Order } from '../types/orders';
import { authFetchQuery } from './api';
import { FetchQueryRes } from './api.type';

interface PostOrderRes {
  cartItemIds: number[];
}

interface FetchOrdersRes {
  orders: Order[];
}

type FetchDetailOrderRes = Order;

export const postOrder: (
  payload: PostOrderRes
) => FetchQueryRes<PostOrderRes> = ({ cartItemIds }: PostOrderRes) => {
  return authFetchQuery.post(`/orders`, {
    body: { cartItemIds },
  });
};

export const fetchOrders = async (): FetchQueryRes<FetchOrdersRes> => {
  const data = await authFetchQuery.get<FetchOrdersRes>('/orders');
  return data;
};

export const fetchDetailOrder = async (
  orderId: number
): FetchQueryRes<Order> => {
  const data = await authFetchQuery.get<FetchDetailOrderRes>(
    `/orders/${orderId}`
  );
  return data;
};
