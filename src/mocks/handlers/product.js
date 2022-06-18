import { PRODUCT_API_URL } from '@/api/constants';
import { productList } from '@/mocks/data/product';
import { rest } from 'msw';

export const productHandlers = [
  rest.get(PRODUCT_API_URL.TO_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        products: productList,
      }),
    );
  }),

  rest.get(PRODUCT_API_URL.TO_PRODUCT_ID, (req, res, ctx) => {
    const {
      params: { id },
    } = req;

    const product = productList.find(product => product.id === Number(id));

    return res(ctx.json({ product }));
  }),
];
