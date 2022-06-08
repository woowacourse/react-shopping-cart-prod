import { API_URL } from '@/api/constants';
import { productList } from '@/mocks/data/product';
import { rest } from 'msw';

export const productHanlders = [
  rest.get(`${API_URL}/products`, (req, res, ctx) => {
    return res(ctx.json({ products: productList }));
  }),

  rest.get(`${API_URL}/products/:productId`, (req, res, ctx) => {
    const {
      params: { productId },
    } = req;

    const product = productList.find(product => product.id === Number(productId));

    return res(ctx.json({ product }));
  }),
];
