import { atom, selector } from 'recoil';

import { CartItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import serverState from './serverState';

export const cartItemsStateSelector = selector({
  key: 'cartItemsStateSelector',

  get: ({ get }) => {
    const server = get(serverState);

    return fetchData<CartItemType[]>({ url: FETCH_URL.cartItems, method: FETCH_METHOD.GET, server });
  },
});

const cartItemsState = atom<CartItemType[]>({
  key: 'cartItemsState',
  default: cartItemsStateSelector,
});

export default cartItemsState;
