import { rest } from 'msw';
import { getCartItems } from '../utils/localStorage';

export const orderHandlers = [
  rest.get('/orders', (_, res, ctx) => {
    return res(ctx.json([]), ctx.status(200), ctx.delay(500));
  }),
];
