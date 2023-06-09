import { selector } from 'recoil';
import serverNameState from '../atoms/serverName';
import type { CartProduct } from '../../types/product';
import CartApi from '../../api/Cart';

const fetchCartItems = selector<CartProduct[]>({
  key: 'fetchCartItems',

  get: async ({ get }) => {
    const serverName = get(serverNameState);
    const cartItemList = await CartApi.getAllList(serverName);
    return cartItemList;
  },
});

export default fetchCartItems;
