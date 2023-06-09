import { Server, ServerName } from 'types/server';

export const ROUTES = {
  PRODUCT_LIST: '/',
  CART_LIST: '/cart',
  ORDERED_LIST: '/order',
  ORDERED_DETAIL: '/order_detail',
} as const;

export const SERVERS: Readonly<Record<ServerName, Server>> = {
  여우: 'https://www.backfoxxx.shop',
  프론트: 'api',
  루쿠: 'https://www.woowacourse.shop',
};
