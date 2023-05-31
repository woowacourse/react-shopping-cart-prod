import { selector } from 'recoil';
import { CartProduct } from '../../types/product';
import ServerUtil from '../../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../../constant';
import serverNameState from '../atoms/serverName';

const fetchCartItemList = selector<CartProduct[]>({
  key: 'fetchCartItemList',

  get: async ({ get }) => {
    const serverName = get(serverNameState);
    const cartItemsUrl = ServerUtil.getCartItemsUrl(serverName);

    const response = await fetch(cartItemsUrl, {
      headers: { Authorization: `Basic ${USER_AUTH_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`장바구니 아이템을 불러오던 중 문제가 발생했습니다.`);
    }

    const cartItemList = await response.json();
    return cartItemList;
  },

  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export default fetchCartItemList;
