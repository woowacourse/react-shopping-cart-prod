import credentialState from "@recoil/server/credentialState";
import serverUrlState from "@recoil/server/serverUrlState";
import { atom, selector, useRecoilValue } from "recoil";

import { ORDER_PATH } from "@constants/urlConstants";
import { OrderType } from "types/OrderType";
import generateFetchOrders from "../remote/fetchOrders";

const orderListState = atom<OrderType[]>({
  key: "orderListState",
  default: selector({
    key: "orderListState/default",
    get: async ({ get }) => {
      const serverUrl = get(serverUrlState);
      const credential = get(credentialState);
      const fetchOrders = generateFetchOrders({
        resource: `${serverUrl}/${ORDER_PATH}`,
        credential,
      });

      const response = await fetchOrders.getOrders();
      if (!response.ok) throw new Error();

      return await response.json();
    },
  }),
});

export default orderListState;

export const useOrderList = () => useRecoilValue(orderListState);
