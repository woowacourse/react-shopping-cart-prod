export const PATH: Readonly<Record<string, string>> = {
  MAIN_PAGE: '/',
  CART_PAGE: '/cart-page',
};

export const KEY_CART = 'cart';

export const QUANTITY: Readonly<Record<string, number>> = {
  INITIAL: 1,
  NONE: 0,
  STEP: 1,
  MAX: 99,
  MIN: 1,
};

export const NOT_NUMBER = /[^0-9]/g;

export const FIRST_INDEX = 0;
export const ONE_ITEM_IN_CART = 1;
export const MAX_NUMBER_LENGTH = 2;

export const DELIVERY_FEE = 3000;

export const SERVERS: Readonly<Record<string, string>> = {
  준팍: 'http://54.180.95.7:8080',
  우르: 'http://43.200.172.73:8080',
  도이: 'http://54.180.105.131:8080',
};
