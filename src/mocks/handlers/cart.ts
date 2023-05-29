import { rest } from 'msw';
import cartProducts from 'mocks/fixtures/cartProducts.json';
import { ErrorResponse } from 'apis';
import store from 'utils/storage';
import { ServerOwner } from 'types/serverOwner';
import { SERVER_OWNER } from 'constants/storeKey';
import BASE_URL from 'constants/apiBaseURL';

type PostReqBody = {
  productId: number;
};

type PatchReqBody = {
  quantity: number;
};

const authorizationError: ErrorResponse = {
  timestamp: new Date().toISOString(),
  status: 500,
  error: '에러 응답이 json 형식이 아닙니다.',
  path: '/cart-items',
};

const serverOwner = store.getStorage<ServerOwner>(SERVER_OWNER) ?? '다즐';
const BASE_URL_BY_OWNER = BASE_URL[serverOwner];

export const cart = [
  rest.get(`${BASE_URL_BY_OWNER}/cart-items`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartProducts), ctx.delay(100));
  }),

  rest.post<PostReqBody>(`${BASE_URL_BY_OWNER}/cart-items`, async (req, res, ctx) => {
    const { productId } = await req.json<PostReqBody>();
    const authorization = req.headers.get('Authorization');

    if (authorization !== 'Basic bob:486') {
      return res(ctx.status(401), ctx.json(authorizationError));
    }

    // https://techcourse.woowahan.com/s/zNFZ8xuU/ls/gRaMDVpX
    // 명세상 return되는 body가 없음...
    // 명세상 productId가 아닌, cartItemId가 반환됨...
    // Location: /cart-items/{cartItemId}
    return res(ctx.status(201), ctx.set('Location', `/cart-items/${productId + 1000}`), ctx.json({}), ctx.delay(100));
  }),

  rest.patch<PatchReqBody>(`${BASE_URL_BY_OWNER}/cart-items/:cartItemId`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (authorization !== 'Basic bob:486') {
      return res(ctx.status(401), ctx.json(authorizationError));
    }
    // 명세상 return되는 body가 없음...
    return res(ctx.status(200), ctx.json({}), ctx.delay(100));
  }),

  rest.delete(`${BASE_URL_BY_OWNER}/cart-items/:cartItemId`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (authorization !== 'Basic bob:486') {
      return res(ctx.status(401), ctx.json(authorizationError));
    }

    return res(ctx.status(204), ctx.delay(100));
  }),
];
