import { rest } from 'msw';

import products from '../data/products.json';

export const productHandlers = [
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/empty', (_, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json([]));
  }),

  rest.get('/products/error', (_, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(400), ctx.json({ error: 'fail' }));
  }),

  rest.get('/products/network-error', (_, res) => {
    return res.networkError('Failed to Connect');
  }),
];
