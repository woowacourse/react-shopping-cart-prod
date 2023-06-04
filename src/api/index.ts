import type { ServerNameType, ProductType, CouponType } from '../types';

import { postJoin, postLogin } from './auth';
import {
  deleteCartItem,
  deleteCartItems,
  getCart,
  patchCartItemQuantity,
  postCartItem,
} from './cart';
import { BASE_URL_MAP } from '../constants';
import { getOrder, getOrders, postOrder } from './order';

export const getProducts = async (serverName: ServerNameType): Promise<ProductType[]> => {
  const url = `${BASE_URL_MAP[serverName]}/products`;
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) throw new Error(`${url} GET error`);
  return response.json();
};

export const getCoupons = async (
  serverName: ServerNameType,
  token: string
): Promise<CouponType[]> => {
  const url = `${BASE_URL_MAP[serverName]}/users/me/coupons`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${url} GET error`);
  return response.json();
};

const api = {
  postJoin,
  postLogin,
  getProducts,
  getCoupons,
  getCart,
  postCartItem,
  patchCartItemQuantity,
  deleteCartItem,
  deleteCartItems,
  getOrders,
  getOrder,
  postOrder,
};

export default api;
