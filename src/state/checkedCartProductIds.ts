import { atom, selector } from 'recoil';
import { cartProductsState } from './cartProducts';
import { CartProduct, CheckedCartProducts } from 'types/product';

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

export const getCheckedCartProductsState = selector({
  key: 'getCheckedCartProductsState',
  get: ({ get }) => {
    const cartProducts = get(cartProductsState);
    const cartCheckedProductIds = get(checkedCartProductIdsState);
    const checkedCartProducts = [...cartCheckedProductIds].map((id) => cartProducts.get(id)) as CartProduct[];

    return checkedCartProducts;
  },
});
