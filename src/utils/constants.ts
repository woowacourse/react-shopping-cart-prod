/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const ROUTES = {
  PRODUCT_LIST: '/',
  CART_LIST: '/cart',
} as const;

export const SERVERS = {
  여우: process.env.REACT_APP_API_FOX!,
  루쿠: process.env.REACT_APP_API_LUKU!,
  프론트: '/api',
};
