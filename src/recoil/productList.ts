import { getProductList } from 'api/products';
import { atom, selector } from 'recoil';
import { serverAtom } from './server';
import { ProductItem } from 'types/api/products';

const productListSelector = selector({
  key: 'initialProductList',
  get: async ({ get }) => {
    const server = get(serverAtom);
    const data = await getProductList(server);
    return data;
  },
});

export const productListAtom = atom<ProductItem[]>({
  key: 'productList',
  default: productListSelector,
});
