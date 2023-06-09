import { selectorFamily } from 'recoil';
import { APIAtom } from '../atoms/serverAtom';
import { base64 } from '../../constants/user';
import { OrderDetailType } from '../../pages/OrderDetail';

export const orderDetailSelector = selectorFamily<OrderDetailType, number>({
  key: 'orderDetailSelector',
  get:
    (orderId) =>
    async ({ get }) => {
      const apiEndPoint = get(APIAtom);
      const response = await fetch(`${apiEndPoint}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${base64}`,
        },
      });
      const orderDetail = (await response.json()) as OrderDetailType;

      return orderDetail;
    },
});
