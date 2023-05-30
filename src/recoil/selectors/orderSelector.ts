import { selector } from 'recoil';
import { Product } from '../../types/Product';
import { base64 } from '../../constants/user';

interface Order {
  orderId: number;
  orderInfo: Product[];
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
