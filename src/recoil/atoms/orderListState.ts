import { atom, selector } from 'recoil';

import { OrderItemType } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import serverState from './serverState';

export const orderListStateSelector = selector({
  key: 'orderListStateSelector',

  get: ({ get }) => {
    const server = get(serverState);

    return fetchData<OrderItemType[]>({ url: FETCH_URL.orderList, method: FETCH_METHOD.GET, server });
  },
});

const orderListState = atom<OrderItemType[]>({
  key: 'orderListState',
  default: orderListStateSelector,
});

export default orderListState;
