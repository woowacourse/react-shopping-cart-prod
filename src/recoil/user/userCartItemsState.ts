import { selector } from 'recoil';
import type { CartItem } from '../../types/CartItem';
import cartItemsState from '../atoms/cartItemsState';
import clientState from '../atoms/clientState';

const userCartItemsState = selector<CartItem[]>({
  key: 'userCartItemsState',
  get: ({ get }) => {
    const client = get(clientState);

    return get(cartItemsState(client));
  },
});

export default userCartItemsState;
