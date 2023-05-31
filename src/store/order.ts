import { atom } from 'recoil';

type OrderProductItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type OrderItemType = {
  id: number;
  products: OrderProductItemType[];
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
