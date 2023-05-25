import { atom, selector, selectorFamily } from 'recoil';
import { CartListWithSelected } from '../types/CartList.ts';

export const cartListAtom = atom<CartListWithSelected | null>({
  key: 'cartListAtom',
  default: [],
});

export const carListTotalQuantitySelector = selector({
  key: 'carListTotalQuantitySelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    if (!cartList) {
      return 0;
    }

    return cartList.length;
  },
});

export const cartTotalPriceSelector = selector({
  key: 'cartTotalPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    if (!cartList) {
      return 0;
    }

    return cartList.reduce((acc, cur) => {
      if (!cur.isSelected) return acc;
      return acc + cur.product.price * cur.quantity;
    }, 0);
  },
});

export const cartSelectedItemsSelector = selector({
  key: 'cartSelectedItemsSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    if (!cartList) {
      return [];
    }

    return [cartList.filter((item) => item.isSelected).length, cartList.length];
  },
});

export const isSelectedSelector = selectorFamily({
  key: 'isSelectedSelector',
  get:
    (id: number) =>
    ({ get }) => {
      const cartList = get(cartListAtom);

      if (!cartList) return true;

      const targetItem = cartList.find((item) => item.id === id);

      if (!targetItem) return true;

      return targetItem.isSelected;
    },
});
