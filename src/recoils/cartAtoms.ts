import { atom, selector, selectorFamily, useRecoilValue } from 'recoil';

import { fetchAPI } from '@api/fetchAPI';
import { localStorageEffect } from './localStorageEffect';

import { baseApiUrlSelector } from './baseApiUrlAtoms';

import { FETCH_METHOD, FETCH_URL, LOCAL_STORAGE_KEY, RECOIL_KEY } from '@constants/index';
import type { CartItem } from 'src/types';

export const cartState = atom<CartItem[]>({
  key: RECOIL_KEY.CART_STATE,
  default: [],
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.CART_STATE)],
});

export const cartSizeSelector = selector({
  key: RECOIL_KEY.CART_SIZE_SELECTOR,
  get: ({ get }) => {
    const cartItems = get(cartState);

    return cartItems.length;
  },
});

export const checkedCartItemsSelector = selector({
  key: RECOIL_KEY.CHECKED_CART_ITEMS_SELECTOR,
  get: ({ get }) => {
    const cartItems = get(cartState);

    return cartItems.filter((item) => item.checked === true);
  },
});

export const isAllCartCheckedSelector = selector({
  key: RECOIL_KEY.IS_ALL_CART_CHECKED_SELECTOR,
  get: ({ get }) => {
    const cartItems = get(cartState);

    if (cartItems.length > 0) {
      return cartItems.every((item) => item.checked);
    }

    return true;
  },
});

export const findCartItemByProductIdSelector = selectorFamily<CartItem | undefined, number>({
  key: RECOIL_KEY.FIND_CART_ITEM_BY_PRODUCT_ID_SELECTOR,
  get:
    (productId) =>
    ({ get }) => {
      const cartItems = get(cartState);

      return cartItems.find((item) => item.product.id === productId);
    },
});

export const cartRepository = selector({
  key: RECOIL_KEY.CART_REPOSITORY,
  get: ({ getCallback }) => {
    const fetchCartItems = getCallback(({ set, snapshot }) => async (cartItemId?: number) => {
      const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
      const localCartItems = await snapshot.getPromise(cartState);

      const cartItems = await fetchAPI(baseApiUrl + FETCH_URL.CART_ITEMS, {
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        },
      });

      const isChecked = (targetId: number) => {
        if (targetId === cartItemId) return true;

        return localCartItems.find((localItem) => localItem.id === targetId)?.checked;
      };

      const cartItemsWithCheckedState = cartItems.map((cartItem: CartItem) => ({
        ...cartItem,
        checked: isChecked(cartItem.id),
      }));

      set(cartState, cartItemsWithCheckedState);
    });

    const addCartItem = getCallback(({ snapshot }) => async (body: { productId: number }) => {
      const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
      const { cartItemId } = await fetchAPI(baseApiUrl + FETCH_URL.CART_ITEMS, {
        method: FETCH_METHOD.POST,
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
          await fetchAPI(`${baseApiUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`, {
            method: FETCH_METHOD.PATCH,
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
      await fetchAPI(`${baseApiUrl + FETCH_URL.CART_ITEMS}/${cartId}`, {
        method: FETCH_METHOD.DELETE,
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
