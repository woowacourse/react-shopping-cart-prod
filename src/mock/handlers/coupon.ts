import { rest } from 'msw';
import { SERVER, COUPON_URL } from '../../constants/url';
import coupons from '../coupons.json';

export const couponHandlers = [
  // 쿠폰 조회
  rest.get(`${SERVER.MSW}${COUPON_URL}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(coupons));
  }),
];
