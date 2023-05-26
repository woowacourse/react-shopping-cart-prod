export const PAGE_ROUTES = {
  HOME: '/',
  CART: '/cart',
  ORDER: '/order',
} as const;

export const getPageTitle = (location: string) => {
  switch (location) {
    case PAGE_ROUTES.HOME:
      return '상품 목록';
    case PAGE_ROUTES.CART:
      return '장바구니';
    case PAGE_ROUTES.ORDER:
      return '주문목록';
    default:
      return '주문 상세 조회';
  }
};
