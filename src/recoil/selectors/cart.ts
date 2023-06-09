import { selectorFamily } from 'recoil';
import { cartState } from '../atoms/cart';
import type { CartItem } from '../../types/cart';

export const selectedCartItems = selectorFamily<
  CartItem[],
  Set<CartItem['id']>
>({
  key: 'selectedCartItems',
  get:
    (selectedItemIds: Set<CartItem['id']>) =>
    ({ get }) => {
      return get(cartState).filter((cartItem) =>
        selectedItemIds.has(cartItem.id),
      );
    },
});
