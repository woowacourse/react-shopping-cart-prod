import { atom, selector } from 'recoil';
import { cartProductsState } from './cartProducts';
import { CheckedCartProducts } from 'types/product';

const defaultCartCheckedProductsState = selector({
  key: 'defaultCartCheckedProducts',
  get: ({ get }) => {
    const cartProducts = get(cartProductsState);

    return new Set(cartProducts.keys());
  },
});

export const cartCheckedProductsState = atom<CheckedCartProducts>({
  key: 'cartCheckedProductsState',
  default: defaultCartCheckedProductsState,
});
