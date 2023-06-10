import { ServerName } from '../types/server';

export const BASE_URL: Record<ServerName, string | undefined> = {
  누누: process.env.REACT_APP_NUNU_SERVER_URL,
  체인저: process.env.REACT_APP_CHANGER_SERVER_URL,
  필립: process.env.REACT_APP_PHILIP_SERVER_URL,
  Mock: '',
};

export const DEFAULT_SERVER_NAME = Object.keys(BASE_URL)[0] as ServerName;

export const PRODUCTS_PATH_NAME = `/products`;
export const CART_ITEMS_PATH_NAME = `/cart-items`;
export const COUPONS_PATH_NAME = `/coupons`;
export const USERS_COUPON_PATH_NAME = `/coupons/me`;
export const ORDERS_PATH_NAME = `/orders`;

export const CART_LIST_KEY = 'cart_list';
