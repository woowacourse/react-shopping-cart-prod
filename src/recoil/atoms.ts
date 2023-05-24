import { atom, atomFamily } from 'recoil';
import { CartItemInfo, ProductInfo } from '../types';
import { SERVER } from '../constants';

export const selectedHostState = atom<string>({
  key: 'selectedHost',
  default: SERVER.박스터,
});

export const productListState = atom<ProductInfo[]>({
  key: 'productList',
  default: [],
});

export const cartListState = atom<CartItemInfo[]>({
  key: 'cartList',
  default: [],
});

export const checkedCartItemIdsState = atomFamily<number[], number[]>({
  key: 'checkedCartItemIds',
  default: (cartItemIds) => {
    return [...cartItemIds];
  },
});
