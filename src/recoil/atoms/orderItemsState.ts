import { atom, selector } from 'recoil';

import { OrderItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import serverState from './serverState';

export const orderItemsStateSelector = selector({
  key: 'orderItemsStateSelector',

  get: ({ get }) => {
    const server = get(serverState);

    return fetchData<OrderItemType[]>({ url: FETCH_URL.orders, method: FETCH_METHOD.GET, server });
  },
});

const orderItemsState = atom<OrderItemType[]>({
  key: 'orderItemsState',
  default: orderItemsStateSelector,
});

export default orderItemsState;
