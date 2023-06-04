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
  key: 'orders',
  default: [],
});


