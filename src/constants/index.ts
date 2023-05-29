export const ROUTE_PATH: Readonly<Record<string, string>> = {
  MAIN_PAGE: '/',
  CART_PAGE: '/cart-page',
  ERROR_PAGE: '/404',
};

export const KEY_CART = 'cart';

export const QUANTITY: Readonly<Record<string, number>> = {
  INITIAL: 1,
  NONE: 0,
  STEP: 1,
  MAX: 10,
  MIN: 1,
};

export const NOT_NUMBER = /[^0-9]/g;

export const FIRST_INDEX = 0;
export const ONE_ITEM_IN_CART = 1;
export const MAX_NUMBER_LENGTH = 2;

export const DELIVERY_FEE = 3000;
