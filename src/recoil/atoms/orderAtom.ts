import { atom } from 'recoil';
import { base64 } from '../../constants/user';

export interface OrderProductInfo {
  productId: number;
  price: number;
  name: string;
  imageUrl: string;
  quantity: number;
}

interface Order {
  orderId: number;
  orderInfo: OrderProductInfo[];
}

export const orderListState = atom<Order[]>({
  key: 'orderListState',
  default: [],
  effects: [
    ({ setSelf, trigger }) => {
      const getOrderList = async () => {
        const response = await fetch('/orders', {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64}`,
          },
        });
        const orderList = await response.json();

        setSelf(orderList);
      };

      if (trigger === 'get') getOrderList();
    },
  ],
});
