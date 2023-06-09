import { rest } from 'msw';
import { CART_URL, SERVER } from '../../constants/url';
import cartItems from '../cartItems.json';

export const cartHandlers = [
  // 장바구니 목록 조회
  rest.get(`${SERVER.MSW}${CART_URL}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartItems));
  }),

  // 장바구니 아이템 추가
  rest.post(`${SERVER.MSW}${CART_URL}`, async (req, res, ctx) => {
    const { productId } = await req.json();

    return res(
      ctx.status(201),
      ctx.set('Location', `${CART_URL}/${productId}`),
      ctx.set('Access-Control-Expose-Headers', 'Location'),
    );
  }),

  // 장바구니 아이템 수량 변경
  rest.patch(`${SERVER.MSW}${CART_URL}/:id`, async (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${SERVER.MSW}${CART_URL}`, async (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
