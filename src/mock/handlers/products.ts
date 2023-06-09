import { rest } from 'msw';
import { PRODUCT_LIST_URL, SERVER } from '../../constants/url';
import products from '../products.json';

export const productsHandlers = [
  // 상품 목록 조회
  rest.get(`${SERVER.MSW}${PRODUCT_LIST_URL}`, (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(products));
  }),

  // 상품 조회
  rest.get(`${SERVER.MSW}${PRODUCT_LIST_URL}/:id`, (req, res, ctx) => {
    const productId = Number(req.params.id);
    const product = products.find((product) => product.id === productId);

    if (!product) {
      return res(ctx.status(404), ctx.json({ message: '해당 상품이 존재하지 않습니다.' }));
    }

    return res(ctx.status(200), ctx.json(product));
  }),
];
