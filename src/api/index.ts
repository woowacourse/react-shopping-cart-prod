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

export const getProducts = async (serverName: ServerNameType): Promise<ProductType[]> =>
  fetcher(serverName)('GET', 'products');

export const getCoupons = async (
  serverName: ServerNameType,
  token: string
): Promise<CouponType[]> => fetcher(serverName, token)('GET', 'users/me/coupons');

export default {
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
