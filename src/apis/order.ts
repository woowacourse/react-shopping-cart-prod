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
