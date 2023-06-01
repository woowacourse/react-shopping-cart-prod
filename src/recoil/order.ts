import { Order, Orders, getOrders } from "api/orders";
import { atom, selector, selectorFamily } from "recoil";
import { serverSelectState } from "./server";

const getOrderList = selector<Orders[]>({
  key: "getOrderList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const orders = await getOrders(selectedServer);

    return orders;
  },
});

export const orderListState = atom<Orders[]>({
  key: "orderList",
  default: getOrderList,
});

export const orderSelector = selectorFamily<Order[] | null, number>({
  key: "orderSelector",
  get:
    (orderId) =>
    ({ get }) =>
      get(orderListState).find((order) => order.orderId === orderId)?.orderItems ?? null,
});
