/* eslint-disable no-nested-ternary */
import { atomFamily, DefaultValue, selector } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartItem } from '../../types/CartItem';
import syncCartItemsEffect from '../effects/syncCartItemsEffect';
import cartItemsQuery from '../queries/cartItemsQuery';
import clientState from './clientState';

const internalCartItemsState = atomFamily<(CartItem | CartItemEntity)[], Client>({
  key: 'internalCartItemsState',
  default: cartItemsQuery,
  effects: (client) => [syncCartItemsEffect(client)],
});

const cartItemsState = selector<CartItem[]>({
  key: 'cartItemsState',
  get: ({ get }) => {
    const client = get(clientState);
    const cartItems = get(internalCartItemsState(client));
    return cartItems;
  },
  set: ({ get, set, reset }, rawNewCartItems) => {
    const client = get(clientState);
    if (rawNewCartItems instanceof DefaultValue) {
      reset(internalCartItemsState(client));
      return;
    }

    const newCartItems = rawNewCartItems.filter((newCartItem) => newCartItem.quantity > 0);
    set(internalCartItemsState(client), newCartItems);
  },
});

export default cartItemsState;
