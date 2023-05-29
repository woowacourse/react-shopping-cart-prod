import { selector } from 'recoil';
import { CartProduct } from '../../types/product';
import ServerUtil from '../../utils/ServerUrl';
import { DEFAULT_SERVER_NAME, USER_AUTH_TOKEN } from '../../constant';

const fetchCartItemList = selector<CartProduct[]>({
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

export default fetchCartItemList;
