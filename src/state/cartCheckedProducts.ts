import { atom, selector } from 'recoil';
import { cartProductsState } from './cartProducts';
import { CheckedCartProducts } from 'types/product';

const defaultCheckedCartProductIdsState = selector({
  key: 'defaultCartCheckedProducts',
  get: ({ get }) => {
    const cartProducts = get(cartProductsState);

    return new Set(cartProducts.keys());
  },
});

export const checkedCartProductIdsState = atom<CheckedCartProducts>({
  key: 'cartCheckedProductsState',
  default: defaultCheckedCartProductIdsState,
});

const getCheckedCartProductsState = selector({
  key: 'getCheckedCartProductsState',
  get: ({ get }) => {
    const cartProducts = get(cartProductsState);
    const cartCheckedProducts = get(checkedCartProductIdsState);
    [...cartProducts.entries()].filter(([cartProductId, cartProduct]) => {});

    cartProducts.forEach((cartProduct, cartProductId) => {
      new Map(cartProducts);
    });

    return;
  },
});
