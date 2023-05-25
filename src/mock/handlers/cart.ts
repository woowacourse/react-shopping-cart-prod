import { rest } from 'msw';
import { CART_URL, SERVERS } from '../../constants/url';

export const cartHandlers = [
  // 장바구니 목록 조회
  rest.get(`${SERVERS.준팍}${CART_URL}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  // 장바구니 아이템 추가
  rest.post(`${SERVERS.준팍}${CART_URL}`, async (req, res, ctx) => {
    const { productId } = await req.json();

    return res(
      ctx.status(201),
      ctx.set('Location', `${CART_URL}/${productId}`),
      ctx.set('Access-Control-Expose-Headers', 'Location')
    );
  }),

  // 장바구니 아이템 수량 변경
  rest.patch(`${SERVERS.준팍}${CART_URL}/:id`, async (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${SERVERS.준팍}${CART_URL}/:id`, async (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
