import { selectorFamily } from 'recoil';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { getOrderDetailApi } from '@utils/order/fetchOrder';
import { OrderType } from '@type/orderType';

export const getOrderDetailSelector = selectorFamily<OrderType, number>({
  key: 'getOrderDetailSelector',
  get:
    (orderId: number) =>
    async ({ get }) => {
      const userInfo = get(userState);
      const serverName = get(serverState);
      const orderDetail = await getOrderDetailApi({ serverName, userInfo, orderId });

      return orderDetail;
    },
  cachePolicy_UNSTABLE: { eviction: 'most-recent' },
});
