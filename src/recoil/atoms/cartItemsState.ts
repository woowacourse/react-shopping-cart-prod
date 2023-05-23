import { atom, selector } from 'recoil';

import { CartItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/index';

const cartItemsStateSelector = selector({
  key: 'cartItemsStateSelector',

  get: () => {
    return fetchData<CartItemType[]>({ url: FETCH_URL.cartItems, method: FETCH_METHOD.GET });
  },
});

const cartItemsState = atom<CartItemType[]>({
  key: 'cartItemsState',
  default: cartItemsStateSelector,
});

export default cartItemsState;
