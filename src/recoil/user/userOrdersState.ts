import { selector } from 'recoil';
import clientState from '../atoms/clientState';
import ordersQuery from '../queries/ordersQuery';

const userOrdersState = selector({
  key: 'userOrdersState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(ordersQuery({ client }));
  },
});

export default userOrdersState;
