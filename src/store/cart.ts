import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

import { getAuthorizedOptionHeaders } from '../api/authorizedOptionHeaders';
import { getCartAPI } from '../api/cartAPI';
import { CART_LIST_CHECKBOX_KEY } from '../constants/store';
import { changeCartItemQuantity } from '../domain/cart';
import { CartItemData } from '../types/cart';
import { checkedListState } from './checkbox';
import { currentMemberInformationState, currentMemberState } from './member';
import { currentServerState } from './server';

const cartListQuery = selector({
  key: 'cartListQuery',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const currentMember = get(currentMemberState);
    const authorizedHeaders = getAuthorizedOptionHeaders(currentMember);

    const cartAPI = getCartAPI(currentServer, authorizedHeaders);

    return cartAPI.getCartList();
  },
});

const cartListState = atom<CartItemData[]>({
  key: 'cartList',
  default: cartListQuery,
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

const cartListSubTotalState = selector({
  key: 'cartListSubTotal',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartItemList = get(checkedListState(CART_LIST_CHECKBOX_KEY));

    const subTotal = cartList
      .filter((cartItem) => checkedCartItemList.has(cartItem.id))
      .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

    return subTotal;
  },
});

const cartListTotalItemDiscountAmountState = selector<number>({
  key: 'cartListItemDiscountAmount',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartItemList = get(checkedListState(CART_LIST_CHECKBOX_KEY));

    const totalItemDiscountAmount = cartList
      .filter((cartItem) => checkedCartItemList.has(cartItem.id))
      .reduce((acc, curr) => {
        if (curr.product.discountRate > 0) {
          return acc + curr.quantity * curr.product.price * (curr.product.discountRate / 100);
        }

        return acc;
      }, 0);

    return totalItemDiscountAmount;
  },
});

const cartListMemberDiscountAmountState = selector<number>({
  key: 'cartListMemberDiscountAmount',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartItemList = get(checkedListState(CART_LIST_CHECKBOX_KEY));
    const memberInformation = get(currentMemberInformationState);

    const memberDiscountAmount = cartList
      .filter((cartItem) => checkedCartItemList.has(cartItem.id))
      .reduce((acc, curr) => {
        if (memberInformation.rank === '일반' || curr.product.discountRate > 0) {
          return acc;
        }

        return acc + curr.quantity * curr.product.price * (memberInformation.discountRate / 100);
      }, 0);

    return memberDiscountAmount;
  },
});

export {
  cartListQuery,
  cartListState,
  cartIdListState,
  cartItemIdState,
  cartListItemCountState,
  cartItemQuantityState,
  cartListSubTotalState,
  cartListTotalItemDiscountAmountState,
  cartListMemberDiscountAmountState,
};
