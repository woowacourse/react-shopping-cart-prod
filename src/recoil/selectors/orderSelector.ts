import { atom, selector } from 'recoil';
import { Product } from '../../types/Product';
import { base64 } from '../../constants/user';

export interface Order {
  orderId: number;
  orderInfos: Product[];
}

export const orderListSelector = selector<Order[]>({
  key: 'orderListSelector',
  get: async () => {
    const getOrderList = await fetch('/orders', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });

    return getOrderList.json();
  },
});

export const orderListState = atom<Order[]>({
  key: 'orderListState',
  default: orderListSelector,
});
