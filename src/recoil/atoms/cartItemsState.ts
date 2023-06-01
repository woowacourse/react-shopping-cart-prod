/* eslint-disable no-nested-ternary */
import { atomFamily, DefaultValue, selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { CartItem } from '../../types/CartItem';
import syncCartItemsEffect from '../effects/syncCartItemsEffect';
import cartItemsQuery from '../queries/cartItemsQuery';

const internalCartItemsState = atomFamily<CartItem[], Client>({
  key: 'internalCartItemsState',
  default: (client) => cartItemsQuery({ client }),
  effects: (client) => [syncCartItemsEffect(client)],
});

const cartItemsState = selectorFamily<CartItem[], Client>({
  key: 'cartItemsState',
  get:
    (client) =>
    ({ get }) => {
      const cartItems = get(internalCartItemsState(client));
      return cartItems;
    },
  set:
    (client) =>
    ({ set, reset }, rawNewCartItems) => {
      if (rawNewCartItems instanceof DefaultValue) {
        reset(internalCartItemsState(client));
        return;
      }

      const newCartItems = rawNewCartItems.filter((newCartItem) => newCartItem.quantity > 0);
      set(internalCartItemsState(client), newCartItems);
    },
});

export default cartItemsState;
