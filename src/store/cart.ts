import { atom, selector, selectorFamily } from 'recoil';
import { Cart } from '../types/responseData';
import { fetchedCartListSelector } from './asyncSelector';
import { Select } from '../types/global';

export const cartAtom = atom<Cart[]>({
  key: 'cart/cart-list',
  default: fetchedCartListSelector,
});

export const cartSelector = selector({
  key: 'cart/selector',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const cartsQuantity = cartList.length;

    return { cartsQuantity };
  },
});

export const cartSelectorFamily = selectorFamily({
  key: 'cart/selector-family',
  get:
    (id: number) =>
    ({ get }) => {
      const cartList = get(cartAtom);

      return cartList.find((item) => item.id === id) as Cart;
    },
});

export const checkedValue = selector({
  key: 'cart/checked-value',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const NO_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: false,
      order: {
        id: item.product.id,
        quantity: item.quantity,
      },
    }));

    const ALL_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: true,
      order: {
        id: item.product.id,
        quantity: item.quantity,
      },
    }));

    return { NO_CHECKED, ALL_CHECKED };
  },
});

export const totalAmountAtom = atom({
  key: 'cart/total-amount',
  default: 0,
});

export const isSelectedListAtom = atom<Select[]>({
  key: 'cart/is-selected-list',
  default: [],
});
