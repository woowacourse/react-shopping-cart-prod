import { selector, selectorFamily } from 'recoil';

import { getAuthorizedOptionHeaders } from '../api/authorizedOptionHeaders';
import { getMemberAPI } from '../api/memberAPI';
import { OrderData } from '../types';
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

      const totalItemDiscountAmount = order?.orderedItems.reduce((acc, curr) => {
        if (curr.product.discountRate > 0) {
          return acc + curr.quantity * curr.product.price * (curr.product.discountRate / 100);
        }

        return acc;
      }, 0);

      return totalItemDiscountAmount > 0 ? -totalItemDiscountAmount : 0;
    },
});

const orderMemberDiscountAmountState = selectorFamily<number, number>({
  key: 'cartListMemberDiscountAmount',
  get:
    (orderId) =>
    ({ get }) => {
      const order = get(orderState(orderId))!;
      const memberInformation = get(currentMemberInformationState);

      const memberDiscountAmount = order?.orderedItems.reduce((acc, curr) => {
        if (memberInformation.rank === '일반' || curr.product.discountRate > 0) {
          return acc;
        }

        return acc + curr.quantity * curr.product.price * (memberInformation.discountRate / 100);
      }, 0);

      return memberDiscountAmount > 0 ? -memberDiscountAmount : 0;
    },
});

export {
  orderListState,
  orderState,
  orderTotalItemDiscountAmountState,
  orderMemberDiscountAmountState,
};
