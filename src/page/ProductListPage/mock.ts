// @ts-nocheck
import { rest } from 'msw';
import { dummyProductList } from 'dummy_data';

const getProductsHandler = rest.get('/products', (req, res, ctx) => {
  try {
    // 상품목록조회 성공
    return res(ctx.status(200), ctx.json(dummyProductList));
  } catch (error) {}
});

export default getProductsHandler;
