import { selectorFamily } from 'recoil';
import type { Order } from '../../types/Order';
import clientState from '../atoms/clientState';
import orderDetailQuery from '../queries/orderDetailQuery';

const userOrderDetailState = selectorFamily<Order, Order['id']>({
  key: 'userOrderDetailState',
  get:
    (orderId) =>
    ({ get }) => {
      const client = get(clientState);
      const response = get(orderDetailQuery({ client, orderId }));

      return response.acceptOrThrow(200).data;
    },
});

export default userOrderDetailState;
