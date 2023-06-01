import { rest } from 'msw';

import coupons from '../data/coupons.json';

export const couponHandlers = [
  rest.get('/coupons', (_, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(coupons));
  }),
];
