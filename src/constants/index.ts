export const LOCAL_STORAGE_KEY = Object.freeze({
  CART_ITEM: 'cart-items',
  ORDER_LIST: 'order-list',
  PAYMENTS: 'payments',
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
  ADD_CART_FAILED: '장바구니에 추가하는 과정에서 에러가 발생했습니다.',
  DELETE_CART_FAILED: '장바구니에 삭제하는 과정에서 에러가 발생했습니다.',
  MUTATE_CART_FAILED: '수량을 바꾸는 과정에서 에러가 발생하였습니다.',
  PRODUCT_GET_FAILED: '제품 목록을 불러오는 과정에서 문제가 생겼습니다.',
  PAYMENTS_SUCCESSFUL: '주문이 완료되었습니다.',
  PAYMENTS_FAILED: '주문 과정에서 에러가 발생했습니다.',
  RESPONSE_NOT_OKAY: '응답이 온전하지 않습니다.',
  NETWORK_ERROR: '네트워크 오프라인이 감지되었습니다. 인터넷 연결을 확인해주세요',
});

export const ROUTE_PATH = Object.freeze({
  DEFAULT: '/',
  CART: '/cart',
  ORDER: '/order',
  ORDER_DETAIL: `/order/:id`,
});

export const API_URL = Object.freeze({
  TOTAL_CART_PRICE: '/total-cart-price',
  PRODUCTS: '/products',
  CART: '/cart-items',
  ORDER: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  CART_ITEM: (id: string) => `/cart-items/${id}`,
});

export const PARCEL_PRICE = 3000;

export const USER = 'a@a.com:1234';
