import { Order } from '../types/orders';
import { authFetchQuery } from './api';
import { FetchQueryRes } from './api.type';

interface PostOrderRes {
  cartItemIds: number[];
}

type FetchOrdersRes = Order[];

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
