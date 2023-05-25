import { selector } from 'recoil';
import { cartItemsState } from '../atoms/cartAtom';

export const cartItemsLengthState = selector({
  key: 'cartIdListLengthState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.length;
  },
});
