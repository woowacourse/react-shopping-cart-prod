import { selector, selectorFamily } from 'recoil';

import { getAuthorizedOptionHeaders } from '../api/authorizedOptionHeaders';
import { getMemberAPI } from '../api/memberAPI';
import { OrderData } from '../types/order';
import { getMemberDiscountAmount, getTotalItemDiscountAmount } from '../utils/discount';
import { currentMemberInformationState, currentMemberState } from './member';
import { currentServerState } from './server';

const orderListState = selector<OrderData[]>({
  key: 'orderList',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const currentMember = get(currentMemberState);
    const authorizedHeaders = getAuthorizedOptionHeaders(currentMember);

    const memberAPI = getMemberAPI(currentServer, authorizedHeaders);
    const currentMemberInformation = get(currentMemberInformationState);

    return memberAPI.getMemberOrderList(currentMemberInformation.id);
  },
});

const orderState = selectorFamily<OrderData | null, number>({
  key: 'orderItem',
  get:
    (orderId) =>
    ({ get }) => {
      const orderList = get(orderListState);
      const orderItem = orderList.find((orderItem) => orderItem.id === orderId);

      return orderItem ?? null;
    },
});

const orderTotalItemDiscountAmountState = selectorFamily<number, number>({
  key: 'orderTotalItemDiscountAmount',
  get:
    (orderId) =>
    ({ get }) => {
      const order = get(orderState(orderId))!;

      const totalItemDiscountAmount = getTotalItemDiscountAmount(order.orderedItems);

      return totalItemDiscountAmount !== 0 ? -totalItemDiscountAmount : 0;
    },
});

const orderMemberDiscountAmountState = selectorFamily<number, number>({
  key: 'cartListMemberDiscountAmount',
  get:
    (orderId) =>
    ({ get }) => {
      const order = get(orderState(orderId))!;
      const memberInformation = get(currentMemberInformationState);

      const memberDiscountAmount = getMemberDiscountAmount(order.orderedItems, memberInformation);

      return memberDiscountAmount !== 0 ? -memberDiscountAmount : 0;
    },
});

export {
  orderListState,
  orderState,
  orderTotalItemDiscountAmountState,
  orderMemberDiscountAmountState,
};
