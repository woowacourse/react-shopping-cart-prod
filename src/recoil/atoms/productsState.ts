import { atomFamily, selector } from 'recoil';
import type RestClient from '../../api/RestClient';
import type { ShoppingCartRestAPI } from '../../api/rest/ShoppingCartRestAPI';
import type { Product } from '../../types/Product';
import productsQuery from '../queries/productsQuery';
import clientState from './clientState';

const localProductsState = atomFamily<Product[], RestClient<ShoppingCartRestAPI>>({
  key: 'localProductsState',
  default: productsQuery,
});

const productsState = selector<Product[]>({
  key: 'productsState',
  get: ({ get }) => {
    const client = get(clientState);
    return get(localProductsState(client));
  },
});

export default productsState;
