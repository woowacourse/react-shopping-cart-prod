import { getProductList } from 'api/requests';
import { atom, selector } from 'recoil';
import { Product } from 'types';
import { serverAtom } from './server';

export const productListSelector = atom<Product[]>({
  key: 'productList',
  default: selector({
    key: 'initalProductList',
    get: async ({ get }) => {
      const server = get(serverAtom);
      const data = await getProductList(server);
      return data;
    },
  }),
});
