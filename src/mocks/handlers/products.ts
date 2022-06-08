import { rest } from 'msw';
import { SERVER_URL } from 'configs/api';
import * as db from 'mocks/db.json';

const { products } = db;

const productsHandlers = [
  rest.get(`${SERVER_URL}/api/products/:productId`, (req, res, ctx) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));

    if (!product)
      return res(
        ctx.status(404),
        ctx.json({
          message: '상품이 존재하지 않습니다.',
        })
      );

    if (id) {
      return res(ctx.delay(200), ctx.status(200), ctx.json(product));
    }
  }),
  rest.get(`${SERVER_URL}/api/products`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(products));
  }),
];

export default productsHandlers;
