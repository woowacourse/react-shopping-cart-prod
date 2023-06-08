import type { CartType, CouponType, ServerNameType, ToastInfoType } from '../types';

import { atom, selector, selectorFamily } from 'recoil';

import { localStorageEffect } from './effect';
import { LOCAL_STORAGE_KEY } from '../constants';

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.token)],
});

export const serverNameState = atom<ServerNameType>({
  key: 'serverNameState',
  default: 'MSW',
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.serverName)],
});

export const toastInfoState = atom<ToastInfoType>({
  key: 'toastInfoState',
  default: {
    show: false,
    message: '',
    type: 'info',
  },
});

export const couponsState = atom<CouponType[]>({
  key: 'couponsState',
  default: [],
});

export const usableCouponsState = selector<CouponType[]>({
  key: 'usableCouponsState',
  get: ({ get }) => get(couponsState).filter(({ isUsed }) => !isUsed),
});

export const cartState = atom<CartType>({
  key: 'cartState',
  default: [],
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});

export const cartItemState = selectorFamily({
  key: 'cartItemState',
  get:
    (cartItemId) =>
    ({ get }) => {
      const cart = get(cartState);
      return cart.find(({ id }) => id === cartItemId);
    },
});

export const checkedListState = atom<boolean[]>({
  key: 'checkedListState',
  default: [],
});

export const cartBillTotalPriceState = selector({
  key: 'cartBillTotalPriceState',
  get: ({ get }) => {
    const cart = get(cartState);
    const checkedList = get(checkedListState);

    const checkedCart = cart.filter((_, index) => checkedList[index]);

    return checkedCart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  },
});
