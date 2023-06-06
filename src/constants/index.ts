import { Host } from '../types';

export const PRODUCT = {
  MIN_COUNT: 0,
  MAX_COUNT: 99,
} as const;

export const DELIVERY_FEE = 3000;
export const LOCAL_STORAGE_KEY = {
  CART: 'cart',
  ORDERS: 'orders',
  DETAIL_ORDERS: 'detailOrders',
} as const;

export const URL = {
  PRODUCT_LIST: `${process.env.PUBLIC_URL}/mock/productList.json`,
} as const;

export const HOSTS = ['MSW', '박스터', '밀리'];
export const SERVER: Readonly<Record<Host, string>> = {
  MSW: '',
  박스터: 'http://15.164.219.53:8080',
  밀리: 'http://52.79.242.83:8080',
};
export const PRODUCTS_BASE_URL = '/products';
export const ORDERS_BASE_URL = '/orders';
export const CART_BASE_URL = '/cart-items';
export const COUPON_BASE_URL = '/coupons';
