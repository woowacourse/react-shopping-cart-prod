import { selector, selectorFamily } from 'recoil';

import orderApis from '../../apis/order';
import type { Order, OrderInfo } from '../../types/order';
import { serverNameState } from '../serverName';
import { orderState } from './atom';
import { updateCartProductSelector } from '../cartProducts';
import { updateCouponSelector } from '../coupon';

export const orderSelector = selector<Order[]>({
  key: 'orderSelector',
  get: ({ get }) =>
    orderApis(get(serverNameState))
      .getOrders()
      .then((orders) => orders.reverse()),
});

export const orderDetailSelector = selectorFamily({
  key: 'orderDetailSelector',
  get:
    (orderId: number) =>
    ({ get }) =>
      orderApis(get(serverNameState)).getOrderDetail(orderId),
});

export const orderHandlerSelector = selector({
  key: 'orderHandlerSelector',
  get: ({ get, getCallback }) => {
    const serverName = get(serverNameState);
    const { getOrders, postOrder } = orderApis(serverName);
    const updateCartProduct = get(updateCartProductSelector);
    const updateCoupon = get(updateCouponSelector);

    const addOrder = getCallback(({ set }) => async (orderInfo: OrderInfo) => {
      await postOrder(orderInfo);
      const [newOrders] = await Promise.all([
        getOrders(),
        updateCartProduct(),
        updateCoupon(),
      ]);
      set(orderState, newOrders);
    });

    return { addOrder };
  },
});
