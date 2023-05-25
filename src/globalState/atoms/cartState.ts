import { atom, selector } from 'recoil';
import type { CartProduct } from '../../types/product';
import { DEFAULT_SERVER_NAME, USER_AUTH_TOKEN } from '../../constant';
import ServerUtil from '../../utils/ServerUrl';

export const fetchCartItemList = selector<CartProduct[]>({
  key: 'fetchCartItemList',

  get: async () => {
    const cartItemsUrl = ServerUtil.getCartItemsUrl(DEFAULT_SERVER_NAME);

    const response = await fetch(cartItemsUrl, {
      headers: { Authorization: `Basic ${USER_AUTH_TOKEN}` },
    });

    if (response.status !== 200) throw new Error('서버에 장애가 발생했습니다.');

    const cartItemList = await response.json();
    return cartItemList;
  },
});

const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: fetchCartItemList,
});

export default cartState;
