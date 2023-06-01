import { selector } from 'recoil';
import type { Product } from '../../types/Product';
import clientState from '../atoms/clientState';
import productsQuery from '../queries/productsQuery';

const userProductsState = selector<Product[]>({
  key: 'userProductsState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(productsQuery({ client }));
  },
});

export default userProductsState;
