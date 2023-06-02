export const PAGE_URLS = {
  main: '/',
  cart: '/cart',
  orders: '/orders',
  orderDetail: (id: number) => `/orders/detail/${id}`,
} as const;

export const FETCH_URLS = {
  products: '/products',
  cartItems: '/cart-items',
  coupons: '/coupons',
  orders: '/orders',
};
