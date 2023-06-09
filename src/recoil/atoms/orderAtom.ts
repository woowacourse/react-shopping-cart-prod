import { atomFamily } from 'recoil';
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
  orderInfos: OrderProductInfo[];
}

export const orderListState = atomFamily<Order[], string>({
  key: 'orderListState',
  default: [],
  effects: (apiEndPoint) => [
    ({ setSelf, trigger }) => {
      const getOrderList = () => {
        const orderList = fetch(`${apiEndPoint}/orders`, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64}`,
          },
        }).then((res) => res.json());

        setSelf(orderList);
      };

      if (trigger === 'get') getOrderList();
    },
  ],
});
