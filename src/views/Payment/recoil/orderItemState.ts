import credentialState from '@recoil/server/credentialState';
import serverUrlState from '@recoil/server/serverUrlState';
import { atom, atomFamily, selector, selectorFamily, useRecoilValue } from 'recoil';
import generateFetchOrders from '../utils/fetchOrders';
import { ORDER_PATH } from '@constants/urlConstants';
import { OrderType } from 'types/OrderType';

const orderItemState = atomFamily<OrderType, number>({
  key: 'orderItemState',
  default: selectorFamily({
    key: 'orderListState/default',
    get:
      (orderId) =>
      async ({ get }) => {
        const serverUrl = get(serverUrlState);
        const credential = get(credentialState);
        const fetchOrders = generateFetchOrders({
          resource: `${serverUrl}/${ORDER_PATH}`,
          credential,
        });

        const response = await fetchOrders.getOrder(orderId);
        return await response.json();
      },
  }),
});

export default orderItemState;

export const useOrderItem = (orderId: number) => useRecoilValue(orderItemState(orderId));
