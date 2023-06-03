import { Order } from '../types/orders';
import { authFetchQuery } from './api';
import type {
  FetchDetailOrderRes,
  FetchOrdersRes,
  FetchQueryRes,
  PostOrderRes,
} from './api.type';

export const postOrder: (
  payload: PostOrderRes
) => FetchQueryRes<PostOrderRes> = ({
  cartItemIds,
  couponIds,
}: PostOrderRes) => {
  return authFetchQuery.post(`/orders`, {
    body: { cartItemIds, couponIds },
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
