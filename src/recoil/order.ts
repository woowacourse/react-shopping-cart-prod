import { Order, OrderItem, getOrders } from "api/orders";
import { atom, selector, selectorFamily } from "recoil";
import { serverSelectState } from "./server";

const getOrderList = selector<Order[]>({
  key: "getOrderList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const orders = await getOrders(selectedServer);

    return orders;
  },
});

export const orderListState = atom<Order[]>({
  key: "orderList",
  default: getOrderList,
});

export const orderSelector = selectorFamily<Order | null, number>({
  key: "orderSelector",
  get:
    (orderId) =>
    ({ get }) =>
      get(orderListState).find((order) => order.orderId === orderId) ?? null,
});

export const orderItemsSelector = selectorFamily<OrderItem[] | null, number>({
  key: "orderItemsSelector",
  get:
    (orderId) =>
    ({ get }) =>
      get(orderListState).find((order) => order.orderId === orderId)?.orderItems ?? null,
});
