import { DefaultValue, atom, atomFamily, selector, selectorFamily } from 'recoil';

import { getCartAPI } from '../api/cartAPI';
import { CART_LIST_CHECKBOX_KEY } from '../constants/store';
import { changeCartItemQuantity } from '../domain/cart';
import { CartItemData, CartPriceData } from '../types';
import { PostCartItemRequestBody, PostOrdersRequestBody } from '../types/api';
import { checkedListState } from './checkbox';
import { currentServerState } from './server';
import { getCartPriceInformation } from './utils';

const cartListState = atom<CartItemData[]>({
  key: 'cartList',
  default: selector({
    key: 'cartList/default',
    get: ({ get }) => {
      const currentServer = get(currentServerState);
      const cartAPI = getCartAPI(currentServer);

      return cartAPI.getCartList();
    },
  }),
});

const cartIdListState = selector({
  key: 'cartIdList',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList.map((cartItem) => cartItem.id);
  },
});

const cartItemIdState = selectorFamily<number | null, number>({
  key: 'cartItemId',
  get:
    (productId) =>
    ({ get }) => {
      const cartList = get(cartListState);

      return cartList.find((cartItem) => cartItem.product.id === productId)?.id ?? null;
    },
});

const cartListItemCountState = selector<number>({
  key: 'cartListItemCount',
  get: ({ get }) => get(cartListState).length,
});

const cartItemQuantityState = selectorFamily<number, number>({
  key: 'cartItemQuantity',
  get:
    (cartItemId) =>
    ({ get }) => {
      const cartList = get(cartListState);

      return cartList.find((cartItem) => cartItem.id === cartItemId)?.quantity ?? 0;
    },
  set:
    (cartItemId) =>
    ({ set }, quantity) => {
      if (!quantity || quantity instanceof DefaultValue) return;

      set(cartListState, (prevCartList) => {
        const updatedCartList = changeCartItemQuantity(prevCartList, cartItemId, quantity);

        return updatedCartList ?? prevCartList;
      });
    },
});

const checkedCartItemListState = selector({
  key: 'checkedCartItemList',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartItemIdList = get(checkedListState(CART_LIST_CHECKBOX_KEY));

    const checkedCartItemList = cartList.filter((cartItem) =>
      checkedCartItemIdList.has(cartItem.id)
    );

    return checkedCartItemList;
  },
});

const cartListCheckedItemCostInformationState = selector({
  key: 'cartListCheckedItemCostInformation',
  get: ({ get }): PostOrdersRequestBody => {
    const checkedCartItemIdList = get(checkedListState(CART_LIST_CHECKBOX_KEY));

    const checkedCartItemList = get(checkedCartItemListState);
    const costs = getCartPriceInformation(checkedCartItemList);

    const costInformation = {
      cartItemIds: [...checkedCartItemIdList],
      ...costs,
    };

    return costInformation;
  },
});

const cartListCheckedItemCostInformationFamily = atomFamily({
  key: 'cartListCheckedItemCostInformationFamily',
  default: selectorFamily({
    key: 'cartListCheckedItemCostInformationFamily/Default',
    get:
      (key: keyof CartPriceData) =>
      ({ get }) => {
        const cartListCheckedItemCostInformation = get(cartListCheckedItemCostInformationState);
        const value = cartListCheckedItemCostInformation[key];
        return value > 0 ? value : 0;
      },
  }),
});

export {
  cartListState,
  cartIdListState,
  cartItemIdState,
  cartListItemCountState,
  cartItemQuantityState,
  checkedCartItemListState,
  cartListCheckedItemCostInformationState,
  cartListCheckedItemCostInformationFamily,
};
