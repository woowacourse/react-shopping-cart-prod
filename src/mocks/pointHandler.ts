import { rest } from 'msw';
import { getPoint } from '../utils/localStorage';

export const pointHandler = [
  rest.get('/point', (_, res, ctx) => {
    const point = getPoint();
    return res(ctx.json(point), ctx.status(200));
  }),
];
