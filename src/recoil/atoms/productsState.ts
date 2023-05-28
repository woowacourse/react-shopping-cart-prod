import { atomFamily, selector } from 'recoil';
import type RestClient from '../../api/RestClient';
import type { ShoppingCartRestAPI } from '../../api/rest/ShoppingCartRestAPI';
import type { Product } from '../../types/Product';
import productsQuery from '../queries/productsQuery';
import clientState from './clientState';

const internalProductsState = atomFamily<Product[], RestClient<ShoppingCartRestAPI>>({
  key: 'internalProductsState',
  default: productsQuery,
});

const productsState = selector<Product[]>({
  key: 'productsState',
  get: ({ get }) => {
    const client = get(clientState);
    return get(internalProductsState(client));
  },
});

export default productsState;
