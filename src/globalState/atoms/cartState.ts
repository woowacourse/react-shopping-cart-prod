import { atom } from 'recoil';
import type { AtomEffect } from 'recoil';
import type { CartProduct } from '../../types/product';
import { DEFAULT_SERVER_NAME, USER_AUTH_TOKEN } from '../../constant';
import ServerUtil from '../../utils/ServerUrl';

const fetchEffect: AtomEffect<CartProduct[]> = ({ setSelf, trigger }) => {
  const fetchCartItemList = async () => {
    const cartItemsUrl = ServerUtil.getCartItemsUrl(DEFAULT_SERVER_NAME);

    const response = await fetch(cartItemsUrl, {
      headers: { Authorization: `Basic ${USER_AUTH_TOKEN}` },
    });

    if (response.status !== 200) throw new Error('서버에 장애가 발생했습니다.');

    const cartItemList = await response.json();
    setSelf(cartItemList);
  };

  if (trigger === 'get') {
    fetchCartItemList();
  }
};

const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: [],
  effects: [fetchEffect],
});

export default cartState;
