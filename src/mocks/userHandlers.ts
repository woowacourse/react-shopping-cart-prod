import { rest } from 'msw';
import { getUserPointFromLocalStorage } from '../utils/localStorage';

export const userHandlers = [
  rest.get('/point', (_, res, ctx) => {
    const userPoint = getUserPointFromLocalStorage();

    return res(ctx.json(userPoint), ctx.status(200));
  }),
];
