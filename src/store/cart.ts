import { atom, selector, selectorFamily } from 'recoil';

import { CartItemType } from '../types';

export const cartListState = atom<CartItemType[]>({
  key: 'cartList',
  default: [],
});

export const cartTotalAmountState = selector({
  key: 'cartTotalAmount',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList.reduce((acc, item) => {
      if (item.isChecked) return acc + item.quantity * item.product.price;
      return acc;
    }, 0);
  },
});

export const cartCheckedState = selector({
  key: 'cartCheckedLength',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList.filter((item) => {
      return item.isChecked === true;
    }).length;
  },
});

export const cartCheckedIdState = selector({
  key: 'cartCheckedId',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList
      .filter((item) => {
        return item.isChecked === true;
      })
      .map((item) => item.id);
  },
});

export const cartOrderAmountState = atom({
  key: 'cartOrderAmount',
  default: 0,
});

export const cartItemState = selectorFamily({
  key: 'cartItemQuantity',
  get:
    (productId) =>
    ({ get }) => {
      const cartList = get(cartListState);

      return cartList.find((cartItem) => cartItem.product.id === productId);
    },
});

export const cartOrderDataState = selector({
  key: 'cartOrderData',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList
      .filter((item) => {
        return item.isChecked === true;
      })
      .map((item) => ({ id: item.product.id, quantity: item.quantity }));
  },
});
