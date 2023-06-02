import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

import { getCartAPI } from '../api/cartAPI';
import { changeCartItemQuantity } from '../domain/cart';
import { CartCostsData, CartItemData } from '../types/cart';
import { getCosts } from '../utils/costs';
import { checkedCartIdListState } from './cartCheckbox';
import { currentMemberInformationState } from './member';
import { currentServerState } from './server';

const cartListQuery = selector<CartItemData[]>({
  key: 'cartListQuery',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const cartAPI = getCartAPI(currentServer);

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

const cartListCheckoutCostsState = selector<CartCostsData>({
  key: 'cartListCheckoutPrice',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const checkedCartIdList = get(checkedCartIdListState);
    const memberInformation = get(currentMemberInformationState);
    const checkedCartItems = cartList.filter((cartItem) => checkedCartIdList.has(cartItem.id));

    const cartCosts = getCosts(checkedCartItems, memberInformation);

    return {
      ...cartCosts,
      shippingFee: checkedCartIdList.size === 0 ? 0 : cartCosts.shippingFee,
      totalPrice: checkedCartIdList.size === 0 ? 0 : cartCosts.totalPrice,
    };
  },
});

export {
  cartListQuery,
  cartListState,
  cartIdListState,
  cartItemIdState,
  cartListItemCountState,
  cartItemQuantityState,
  cartListCheckoutCostsState,
};
