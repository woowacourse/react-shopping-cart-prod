import { atom, selector } from 'recoil';
import { cartProductsState } from './cartProducts';
import { CheckedCartProducts } from 'types/product';
import { getCartPriceInfo } from 'apis/cart';

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

    const checkedCartProducts = [...cartProducts.entries()]
      .filter(([cartProductId]) => cartCheckedProductIds.has(cartProductId))
      .map(([_, cartProduct]) => cartProduct);

    return checkedCartProducts;
  },
});

export const cartPriceInfoState = selector({
  key: 'cartPriceInfoState',
  get: async ({ get }) => {
    const checkedProductIds = get(checkedCartProductIdsState);

    if (checkedProductIds.size === 0) {
      return { totalPrice: 0, deliveryFee: 0 };
    }

    const totalPriceInfo = await getCartPriceInfo([...checkedProductIds]);

    return totalPriceInfo;
  },
});
