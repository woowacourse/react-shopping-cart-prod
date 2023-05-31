import { selector } from 'recoil';
import clientState from '../atoms/clientState';
import productsQuery from '../queries/productsQuery';

const userProductsState = selector({
  key: 'userProductsState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(productsQuery({ client }));
  },
});

export default userProductsState;
