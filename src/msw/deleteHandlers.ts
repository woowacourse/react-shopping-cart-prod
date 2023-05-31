import { rest } from 'msw';
import { delay } from './utils';

export const deleteHandlers = [
  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(204));
  }),
];
