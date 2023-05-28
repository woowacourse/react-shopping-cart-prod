import { atom, selector, selectorFamily } from 'recoil';

import { getAuthorizedOptionHeaders } from '../api/authorizedOptionHeaders';
import { getMemberAPI } from '../api/memberAPI';
import { OrderData } from '../types';
import { currentMemberInformationState, currentMemberState } from './member';
import { currentServerState } from './server';

const orderListQuery = selector<OrderData[]>({
  key: 'orderListQuery',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const currentMember = get(currentMemberState);
    const authorizedHeaders = getAuthorizedOptionHeaders(currentMember);

    const memberAPI = getMemberAPI(currentServer, authorizedHeaders);
    const currentMemberInformation = get(currentMemberInformationState);

    return memberAPI.getMemberOrders(currentMemberInformation.id);
  },
});

const orderListState = atom<OrderData[]>({
  key: 'orderList',
  default: orderListQuery,
});

const orderState = selectorFamily<OrderData | null, number>({
  key: 'orderItem',
  get:
    (orderId) =>
    ({ get }) => {
      const orderList = get(orderListState);
      const orderItem = orderList.find((orderItem) => orderItem.id === orderId);

      console.log(orderItem);

      return orderItem ?? null;
    },
});

export { orderListState, orderState };
