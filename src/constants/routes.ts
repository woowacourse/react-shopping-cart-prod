export const PAGE_ROUTES = {
  HOME: '/',
  CART: '/cart',
  ORDER: '/order',
  ORDER_DETAIL: '/order/detail',
} as const;

export const PAGE_TITLE = {
  [PAGE_ROUTES.HOME]: '상품 목록',
  [PAGE_ROUTES.CART]: '장바구니',
  [PAGE_ROUTES.ORDER]: '주문 목록',
  [PAGE_ROUTES.ORDER_DETAIL]: '주문 내역 상세',
} as const;
