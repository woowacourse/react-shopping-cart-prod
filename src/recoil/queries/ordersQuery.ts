import { selector } from 'recoil';
import type { OrderEntity } from '../../api/rest/ShoppingCartRestAPI';
import clientState from '../atoms/clientState';

const ordersQuery = selector<OrderEntity[]>({
  key: 'ordersQuery',
  get: ({ get }) => {
    const client = get(clientState);
    return client
      .get('/orders')
      .acceptOrThrow(200)
      .then((response) => response.data);
  },
});

export default ordersQuery;
