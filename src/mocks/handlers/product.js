import { PRODUCT_API_URL } from '@/api/constants';
import { productList } from '@/mocks/data/product';
import { rest } from 'msw';

export const productHanlders = [
  rest.get(PRODUCT_API_URL.TO_PRODUCTS, (req, res, ctx) => {
    const {
      url: { searchParams },
    } = req;
    const page = Number(searchParams.get('_page')) || 1;
    const limit = Number(searchParams.get('_limit')) || 10;

    if (page === 1 || page === 0) {
      return res(
        ctx.set('x-total-count', `${productList.length}`),
        ctx.json(productList.slice(0, limit)),
      );
    }

    return res(
      ctx.set('x-total-count', `${productList.length}`),
      ctx.json(productList.slice(limit)),
    );
  }),

  rest.get(PRODUCT_API_URL.TO_PRODUCT_ID, (req, res, ctx) => {
    const {
      params: { productId },
    } = req;

    const product = productList.find(product => product.id === Number(productId));

    return res(ctx.json(product));
  }),
];
