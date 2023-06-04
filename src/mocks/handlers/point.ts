import { rest } from 'msw';
import { POINT_BASE_URL } from '../../constants/api';

const POINT = {
  points: 20_000,
};

export const pointHandlers = [
  rest.get(POINT_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(POINT));
  }),
];
