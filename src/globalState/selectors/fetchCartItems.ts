import { selector } from 'recoil';
import { USER_AUTH_TOKEN } from '../../constant';
import ServerUtil from '../../utils/ServerUrl';
import serverNameState from '../atoms/serverName';
import { CartProduct } from '../../types/product';

const fetchCartItems = selector<CartProduct[]>({
  key: 'fetchCartItems',

  get: async ({ get }) => {
    const serverName = get(serverNameState);
    const cartItemsUrl = ServerUtil.getCartItemsUrl(serverName);

    const response = await fetch(cartItemsUrl, {
      method: 'GET',
      headers: { Authorization: `Basic ${USER_AUTH_TOKEN}` },
    });

    if (response.status !== 200) throw new Error('서버에 장애가 발생했습니다.');

    const cartItemList = await response.json();
    return cartItemList;
  },
});

export default fetchCartItems;
