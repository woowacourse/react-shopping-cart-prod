import { rest } from 'msw';
import { COUPON_URL, PRODUCT_LIST_URL } from '../../constants/url';
import productList from '../productList.json';

export const productsHandlers = [
  // 상품 목록 조회
  rest.get(`${process.env.PUBLIC_URL}${PRODUCT_LIST_URL}`, (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(productList));
  }),

  // 상품 조회
  rest.get(`${process.env.PUBLIC_URL}${PRODUCT_LIST_URL}/:id`, (req, res, ctx) => {
    const productId = Number(req.params.id);
    const product = productList.find((product) => product.id === productId);

    if (!product) {
      return res(ctx.status(404), ctx.json({ message: '해당 상품이 존재하지 않습니다.' }));
    }

    return res(ctx.status(200), ctx.json(product));
  }),

  // 쿠폰
  rest.get(`${process.env.PUBLIC_URL}${COUPON_URL}`, (_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json([{ id: 1, name: '배송비 쿠폰', priceDiscount: 3000 }])
    );
  }),
];
