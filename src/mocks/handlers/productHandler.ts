import { rest } from 'msw';
import { products } from '../../components/data/mockData';
import { END_POINTS } from '../../constants/endPoints';

export const productHandler = [
  rest.get(END_POINTS.PRODUCT, (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(products));
  }),
];
