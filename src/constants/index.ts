import { CouponItem, OrderStatus } from '../types';

export const DEFAULT_SERVER = '도이';

export const SERVER_IMAGE_LIST: ReadonlyArray<string> = [
  'https://avatars.githubusercontent.com/u/112045553?v=4',
  'https://avatars.githubusercontent.com/u/62413589?v=4',
  'https://avatars.githubusercontent.com/u/97426362?v=4',
];

export const IMAGE_PATH: Readonly<Record<string, string>> = {
  EMPTY_CART: `${process.env.PUBLIC_URL}/assets/nothing.png`,
  EMPTY_ORDER_LIST: `${process.env.PUBLIC_URL}/assets/empty.png`,
};

export const ROUTE_PATH: Readonly<Record<string, string>> = {
  MAIN_PAGE: '/',
  CART_PAGE: '/cart',
  ORDER_LIST_PAGE: '/order-list',
  ERROR_PAGE: '/404',
};

export const KEY_CART = 'cart';
export const KEY_SERVER = 'server';

export const QUANTITY: Readonly<Record<string, number>> = {
  INITIAL: 1,
  NONE: 0,
  STEP: 1,
  MAX: 10,
  MIN: 1,
};

export const NOT_NUMBER = /[^0-9]/g;

export const MAX_NUMBER_LENGTH = 2;

export const DELIVERY_FEE = 3000;

export const INITIAL_COUPON_STATE: Readonly<CouponItem> = {
  id: 0,
  priceDiscount: 0,
  name: '',
};

export const ORDER_STATUS: Readonly<Record<string, OrderStatus>> = {
  PAID: '결제완료',
  CANCEL: '결제취소',
};

export const ERROR = {
  PREFIX: '[ERROR]',
};
