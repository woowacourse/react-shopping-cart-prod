import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

import { getAuthorizedOptionHeaders } from '../api/authorizedOptionHeaders';
import { getCartAPI } from '../api/cartAPI';
import { changeCartItemQuantity } from '../domain/cart';
import { CartItemData } from '../types/cart';
import { getMemberDiscountAmount, getTotalItemDiscountAmount } from '../utils/discount';
import { checkedCartIdListState } from './cartCheckbox';
import { currentMemberInformationState, currentMemberState } from './member';
import { currentServerState } from './server';

const cartListQuery = selector<CartItemData[]>({
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

const cartIdListState = selector<number[]>({
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

const cartListSubTotalState = selector<number>({
  key: 'cartListSubTotal',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartIdList = get(checkedCartIdListState);

    const subTotal = cartList
      .filter((cartItem) => checkedCartIdList.has(cartItem.id))
      .reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

    return subTotal;
  },
});

const cartListTotalItemDiscountAmountState = selector<number>({
  key: 'cartListItemDiscountAmount',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartIdList = get(checkedCartIdListState);
    const checkedCartItems = cartList.filter((cartItem) => checkedCartIdList.has(cartItem.id));

    const totalItemDiscountAmount = getTotalItemDiscountAmount(checkedCartItems);

    return totalItemDiscountAmount !== 0 ? -totalItemDiscountAmount : 0;
  },
});

const cartListMemberDiscountAmountState = selector<number>({
  key: 'cartListMemberDiscountAmount',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartIdList = get(checkedCartIdListState);
    const memberInformation = get(currentMemberInformationState);
    const checkedCartItems = cartList.filter((cartItem) => checkedCartIdList.has(cartItem.id));

    const memberDiscountAmount = getMemberDiscountAmount(checkedCartItems, memberInformation);

    return memberDiscountAmount !== 0 ? -memberDiscountAmount : 0;
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
