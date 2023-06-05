import { atom, selector, selectorFamily, useRecoilValue } from 'recoil';

import { fetchAPI } from '@api/fetchAPI';
import { localStorageEffect } from './localStorageEffect';

import type { CartItem } from '../types';
import { baseApiUrlSelector } from './baseApiUrlAtoms';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect('cartState')],
});

export const cartSizeSelector = selector({
  key: 'cartSizeSelector',
  get: ({ get }) => {
    const cartItems = get(cartState);

    return cartItems.length;
  },
});

export const checkedCartItemsSelector = selector({
  key: 'checkedCartItemsSelector',
  get: ({ get }) => {
    const cartItems = get(cartState);

    return cartItems.filter((item) => item.checked === true);
  },
});

export const isAllCartCheckedSelector = selector({
  key: 'isAllCartCheckedSelector',
  get: ({ get }) => {
    const cartItems = get(cartState);

    if (cartItems.length > 0) {
      const isAllChecked = cartItems.every((item) => item.checked);

      return isAllChecked;
    }

    return true;
  },
});

export const findCartItemByProductIdSelector = selectorFamily<CartItem | undefined, number>({
  key: 'findCartItemByProductIdSelector',
  get:
    (productId) =>
    ({ get }) => {
      const cartItems = get(cartState);
      const targetItem = cartItems.find((item) => item.product.id === productId);

      return targetItem;
    },
});

export const cartRepository = selector({
  key: 'cartRepository',
  get: ({ getCallback }) => {
    const fetchCartItems = getCallback(({ set, snapshot }) => async (cartItemId?: number) => {
      const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
      const localCartItems = await snapshot.getPromise(cartState);

      const cartItems = await fetchAPI(`${baseApiUrl}/cart-items`, {
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        },
      });

      const isChecked = (targetId: number) => {
        if (targetId === cartItemId) return true;

        return localCartItems.find((localItem) => localItem.id === targetId)?.checked;
      };

      const cartItemsWithCheckedState = cartItems.map((cartItem: any) => ({
        ...cartItem,
        checked: isChecked(cartItem.id),
      }));

      set(cartState, cartItemsWithCheckedState);
    });

    const addCartItem = getCallback(({ snapshot }) => async (body: { productId: number }) => {
      const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
      const { cartItemId } = await fetchAPI(`${baseApiUrl}/cart-items`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
          'Content-Type': 'application/json',
        },
        body,
      });

      await fetchCartItems(cartItemId);
    });

    const updateQuantity = getCallback(
      ({ snapshot }) =>
        async (cartItemId: number, quantity: number) => {
          const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
          await fetchAPI(`${baseApiUrl}/cart-items/${cartItemId}`, {
            method: 'PATCH',
            headers: {
              Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
              'Content-Type': 'application/json',
            },
            body: {
              quantity,
            },
          });

          await fetchCartItems();
        }
    );

    const toggleCheckbox = getCallback(({ snapshot, set }) => async (cartItemId: number) => {
      const cartItems = await snapshot.getPromise(cartState);
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, checked: !item.checked };
        }

        return item;
      });

      set(cartState, updatedCartItems);
    });

    const toggleAllCheckboxBy = getCallback(({ snapshot, set }) => async (checked: boolean) => {
      const cartItems = await snapshot.getPromise(cartState);
      const updatedCartItems = cartItems.map((item) => ({ ...item, checked }));

      set(cartState, updatedCartItems);
    });

    const deleteCartItem = getCallback(({ snapshot }) => async (cartId: number) => {
      const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
      await fetchAPI(`${baseApiUrl}/cart-items/${cartId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        },
      });

      await fetchCartItems();
    });

    return {
      fetchCartItems,
      addCartItem,
      deleteCartItem,
      updateQuantity,
      toggleCheckbox,
      toggleAllCheckboxBy,
    };
  },
});

export const useCartItems = () => useRecoilValue(cartState);

export const useCheckedCartItems = () => useRecoilValue(checkedCartItemsSelector);

export const useIsAllCartChecked = () => useRecoilValue(isAllCartCheckedSelector);

export const useCartRepository = () => useRecoilValue(cartRepository);

export const useCartSize = () => useRecoilValue(cartSizeSelector);

export const useFindCartItemByProductId = (productId: number) =>
  useRecoilValue(findCartItemByProductIdSelector(productId));
