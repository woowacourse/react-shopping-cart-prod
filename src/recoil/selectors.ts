import { selector } from 'recoil';
import { cartListState, checkedCartItemIdsState } from './atoms';
import { CartItemInfo } from '../types';
import { CART_BASE_URL } from '../constants';

export const currentCartListState = selector<CartItemInfo[]>({
  key: 'currentCartList',
  get: async ({ get }) => {
    //const host = get(selectedHostState);
    const cartList = get(cartListState);
    console.log(cartList);
    // const CART_URL = `${host}${CART_BASE_URL}`;
    const CART_URL = CART_BASE_URL;

    //if (cartList.length > 0) return cartList;

    const tokenized = btoa('a@a.com:1234');
    const res = await fetch(CART_URL, {
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${tokenized}` },
    });

    if (!res.ok) throw new Error('장바구니 목록을 불러올 수 없습니다.');

    const currentCartList = await res.json();
    return currentCartList;
  },
});

export const cartListLengthState = selector({
  key: 'cartListLength',
  get: ({ get }) => {
    const cartList = get(currentCartListState);
    return cartList.length;
  },
});

export const totalProductsPriceState = selector({
  key: 'totalProductsPrice',
  get: ({ get }) => {
    const cartList = get(currentCartListState);
    const cartItemIds = cartList.map((cartItem) => cartItem.id);
    const checkedCartItemIds = get(checkedCartItemIdsState(cartItemIds));

    const checkedCartItems = cartList.filter((cartItem) =>
      checkedCartItemIds.includes(cartItem.id)
    );

    const totalProductsPrice = checkedCartItems.reduce((total, cartItem) => {
      const quantity = cartItem.quantity;
      const price = cartItem.product.price;

      return total + quantity * price;
    }, 0);

    return totalProductsPrice;
  },
});
