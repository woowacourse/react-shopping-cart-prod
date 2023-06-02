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
export const MEMBERS_COUPONS_PATH_NAME = `/members/coupons`;
export const MEMBERS_COUPON_PATH_NAME = `/members/coupon`;

export const CART_LIST_KEY = 'cart_list';

const TEMP_ID = 'a@a.com';
const TEMP_PW = '1234';

export const USER_AUTH_TOKEN = btoa(`${TEMP_ID}:${TEMP_PW}`);

export const COUPON_TYPE_UNIT = {
  percent: '%',
  amount: '원',
};
