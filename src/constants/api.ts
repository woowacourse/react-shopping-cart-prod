import { ServerKeys } from '../types/api';

export const CART_LOCAL_STORAGE_KEY = 'cart';
export const ORDERS_LOCAL_STORAGE_KEY = 'orders';

export const PRODUCTS_BASE_URL = '/products';
export const CART_BASE_URL = '/cart-items';
export const ORDERS_BASE_URL = '/orders';
export const POINT_BASE_URL = '/points';

export const BASE_URLS = {
  baron: 'http://somsom.techcourse.store',
  blackCat: 'http://blackcat.techcourse.store',
  kkero: 'http://kkero.store',
  mock: 'http://localhost:3000',
} as const satisfies Record<ServerKeys, string>;
