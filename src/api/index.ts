import type { ServerNameType, ProductType, CouponType } from '../types';

import { postJoin, postLogin } from './auth';
import {
  deleteCartItem,
  deleteCartItems,
  getCart,
  patchCartItemQuantity,
  postCartItem,
} from './cart';
import { getOrder, getOrders, postOrder } from './order';
import fetcher from '../utils/fetcher';

export const getProducts = async (serverName: ServerNameType) =>
  fetcher(serverName)<ProductType[]>('GET', 'products');

export const getCoupons = async (serverName: ServerNameType, token: string) =>
  fetcher(serverName, token)<CouponType[]>('GET', 'users/me/coupons');

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
