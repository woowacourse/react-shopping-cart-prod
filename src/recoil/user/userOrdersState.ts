import { selector } from 'recoil';
import type { Order } from '../../types/Order';
import clientState from '../atoms/clientState';
import ordersQuery from '../queries/ordersQuery';

const userOrdersState = selector<Order[]>({
  key: 'userOrdersState',
  get: ({ get }) => {
    const client = get(clientState);
    const response = get(ordersQuery({ client }));

    return response.acceptOrThrow(200).data;
  },
});

export default userOrdersState;
