import { selector } from 'recoil';
import type { Product } from '../../types/Product';
import clientState from '../atoms/clientState';
import productsQuery from '../queries/productsQuery';

const userProductsState = selector<Product[]>({
  key: 'userProductsState',
  get: ({ get }) => {
    const client = get(clientState);
    const response = get(productsQuery({ client }));

    return response.acceptOrThrow(200).data;
  },
});

export default userProductsState;
