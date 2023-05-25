import { selector } from 'recoil';
import type { ProductEntity } from '../../api/rest/ShoppingCartRestAPI';
import clientState from '../atoms/clientState';

const productsQuery = selector<ProductEntity[]>({
  key: 'productsQuery',
  get: ({ get }) => {
    const client = get(clientState);
    return client
      .get('/products')
      .acceptOrThrow(200)
      .then((response) => response.data);
  },
});

export default productsQuery;
