/* eslint-disable no-nested-ternary */
import { atom, atomFamily, DefaultValue, selector } from 'recoil';
import type { Client } from '../../api';
import type { CartItem } from '../../types/CartItem';
import localStorageEffect from '../effects/localStorageEffect';
import cartItemsQuery from '../queries/cartItemsQuery';
import clientState from './clientState';
import syncCartItemState, { syncCartItemStateKey } from './syncCartItemState';

const localCartItemsState = atomFamily<Omit<CartItem, 'unselectedForOrder'>[], Client>({
  key: 'localCartItemsState',
  default: cartItemsQuery,
});

const unselectedForOrdersState = atom<Array<CartItem['product']['id']>>({
  key: 'unselectedForOrdersState',
  default: [],
  effects: [localStorageEffect('unselectedForOrders')],
});

const cartItemsState = selector<CartItem[]>({
  key: 'cartItemsState',
  get: ({ get }) => {
    const client = get(clientState);
    const cartItems = get(localCartItemsState(client));
    const unselectedForOrders = get(unselectedForOrdersState);

    return cartItems.map((cartItem) => ({
      ...cartItem,
      unselectedForOrder: unselectedForOrders.includes(cartItem.product.id),
    }));
  },
  set: ({ get, set }, rawNewCartItems) => {
    const client = get(clientState);
    const oldCartItems = get(localCartItemsState(client));
    if (rawNewCartItems instanceof DefaultValue) {
      throw new Error('reset of cartItemsState is not implemented!');
    }

    const newCartItems = rawNewCartItems.filter((newCartItem) => newCartItem.quantity > 0);

    // update origin atoms
    set(localCartItemsState(client), newCartItems);
    set(
      unselectedForOrdersState,
      newCartItems
        .filter((cartItem) => cartItem.unselectedForOrder)
        .map((cartItem) => cartItem.product.id),
    );

    // enqueue update to syncCartItemState
    const deletedCartItems = oldCartItems.filter(
      (cartItemEntity) =>
        newCartItems.find((newCartItem) => newCartItem.product.id === cartItemEntity.product.id) ===
        undefined,
    );

    deletedCartItems.forEach((cartItem) => {
      set(syncCartItemState(syncCartItemStateKey(client, cartItem.product.id)), (syncCartItem) => ({
        ...syncCartItem,
        enqueuedUpdates: [...syncCartItem.enqueuedUpdates, { quantity: 0 }],
      }));
    });

    newCartItems.forEach((cartItem) => {
      set(syncCartItemState(syncCartItemStateKey(client, cartItem.product.id)), (syncCartItem) => ({
        ...syncCartItem,
        enqueuedUpdates: [...syncCartItem.enqueuedUpdates, { quantity: cartItem.quantity }],
      }));
    });
  },
});

export default cartItemsState;
