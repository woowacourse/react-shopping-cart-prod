import { rest } from 'msw';
import { delay } from './utils';

export const postHandlers = [
  rest.post('/cart-items', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json({
        cartItemId: new Date().getTime(),
      })
    );
  }),

  rest.post('/orders', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json({
        orderId: new Date().getTime(),
        newEarnedPoint: 3_000,
      })
    );
  }),

  rest.post('/products', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(
      ctx.delay(delay),
      ctx.status(201),
      ctx.json({
        productId: new Date().getTime(),
      })
    );
  }),
];
