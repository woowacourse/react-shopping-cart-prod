import { atom } from 'recoil';
import { ProductItemType } from '../types';

export type OrderItemType = {
  id: number;
  products: ProductItemType[];
};

export const orderListState = atom<OrderItemType[]>({
  key: 'orderList',
  default: [],
});

export const orderItemState = atom<OrderItemType>({
  key: 'orderList',
  default: {
    id: 0,
    products: [],
  },
});
