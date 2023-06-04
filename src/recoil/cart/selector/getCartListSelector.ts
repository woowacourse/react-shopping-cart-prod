import { selector } from 'recoil';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { getCartApi } from '@utils/cart/fetchCart';
import { CartItemType } from '@type/cartType';

export const getCartListSelector = selector<CartItemType[]>({
  key: 'getCartListSelector',
  get: async ({ get }) => {
    const userInfo = get(userState);
    const serverName = get(serverState);
    const cartList = getCartApi({ serverName, userInfo });

    return cartList;
  },
  cachePolicy_UNSTABLE: { eviction: 'most-recent' },
});
