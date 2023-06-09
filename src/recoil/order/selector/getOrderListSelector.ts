import { selector } from 'recoil';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { getOrderListApi } from '@utils/order/fetchOrder';
import { OrderType } from '@type/orderType';

export const getOrderListSelector = selector<OrderType[]>({
  key: 'getOrderListSelector',
  get: async ({ get }) => {
    const userInfo = get(userState);
    const serverName = get(serverState);
    const orderList = await getOrderListApi({ serverName, userInfo });

    return orderList;
  },
  cachePolicy_UNSTABLE: { eviction: 'most-recent' },
});
