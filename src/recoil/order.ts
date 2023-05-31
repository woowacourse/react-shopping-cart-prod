import { Orders, getOrders } from "api/orders";
import { atom, selector } from "recoil";
import { serverSelectState } from "./server";

const getOrderList = selector<Orders[]>({
  key: "getOrderList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const orders = await getOrders(selectedServer);

    console.log(orders);

    return orders;
  },
});

export const orderListState = atom<Orders[]>({
  key: "orderList",
  default: getOrderList,
});
