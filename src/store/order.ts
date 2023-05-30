import { selector, selectorFamily } from 'recoil';

import { getMemberAPI } from '../api/memberAPI';
import { OrderData } from '../types/order';
import { getTotalItemDiscountAmount } from '../utils/discount';
import { currentMemberInformationState } from './member';
import { currentServerState } from './server';

const orderListState = selector<OrderData[]>({
  key: 'orderList',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const memberAPI = getMemberAPI(currentServer);
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
      const totalItemDiscountAmount = get(orderTotalItemDiscountAmountState(orderId));
      const totalDiscountedAmount = order.totalItemPrice - order.discountedTotalItemPrice;

      const memberDiscountAmount = totalDiscountedAmount + totalItemDiscountAmount;

      return memberDiscountAmount !== 0 ? -memberDiscountAmount : 0;
    },
});

export {
  orderListState,
  orderState,
  orderTotalItemDiscountAmountState,
  orderMemberDiscountAmountState,
};
