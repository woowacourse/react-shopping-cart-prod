import { rest } from 'msw';
import { delay } from './utils';

export const patchHandlers = [
  rest.patch('/cart-items/:id', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(200));
  }),
];
