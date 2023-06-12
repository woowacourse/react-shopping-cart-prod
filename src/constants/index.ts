export const LOCAL_STORAGE_KEY = Object.freeze({
  CART_ITEM: 'cart-items',
  PAYMENTS: 'payments',
  ORDERS: 'orders',
});

export const FETCH_METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

export const TOAST_TYPE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
});

export const MESSAGE = Object.freeze({
  ADD_CART_SUCCESSFUL: '장바구니에 추가되었습니다.',
  DELETE_CART_SUCCESSFUL: '장바구니에서 삭제하였습니다.',
  SERVER_CHANGED_SUCCESSFUL: (serverName: string) => `${serverName} 서버로 변경 되었습니다.`,
  ADD_CART_FAILED: '장바구니에 추가하는 과정에서 에러가 발생했습니다.',
  DELETE_CART_FAILED: '장바구니에 삭제하는 과정에서 에러가 발생했습니다.',
  MUTATE_CART_FAILED: '수량을 바꾸는 과정에서 에러가 발생하였습니다.',
  PRODUCT_GET_FAILED: '제품 목록을 불러오는 과정에서 문제가 생겼습니다.',
  SERVER_NOT_FOUND: '해당 서버가 존재하지 않습니다.',
  RESPONSE_NOT_OKAY: '응답이 온전하지 않습니다.',
});

export const ROUTE_PATH = Object.freeze({
  DEFAULT: '/',
  CART: '/cart',
  ORDER: '/order',
  ORDER_DETAIL: '/order-detail/:id',
  ORDER_CHECKOUT: '/order-checkout',
});

export const PARCEL_PRICE = 3000;

export const USER = 'a@a.com:1234';

export const DEFAULT_HEADER = Object.freeze({
  'Content-Type': 'application/json',
  Authorization: `Basic ${btoa(USER)}`,
});
