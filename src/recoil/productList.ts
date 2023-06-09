import { getProductList } from 'api/requests';
import { selector } from 'recoil';
import { Product } from 'types';
import { serverAtom } from './server';

export const productListSelector = selector<Product[]>({
  key: 'productList',
  get: async ({ get }) => {
    const server = get(serverAtom);
    const data = await getProductList(server);
    return data;
  },
});
