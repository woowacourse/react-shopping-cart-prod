import { rest } from 'msw';
import { loginSuccessData } from './authHandlerData';
import { userInfomationData } from './customerHandlerData';
import { productDetailData, productListData } from './productHandlerData';
import { cartItemsData } from './cartHandlerData';

const HOST_NAME = process.env.REACT_APP_API_URL;

export const productHandler = [
  // 상품 리스트 불러오기
  rest.get(`${HOST_NAME}/products`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(productListData)),
  ),

  // 상품 상세정보 불러오기
  rest.get(`${HOST_NAME}/product`, (req, res, ctx) => {
    const productId = req.url.searchParams.get('id');

    return res(ctx.status(200), ctx.json(productDetailData(productId)));
  }),
];

export const authHandler = [
  // 로그인
  rest.post(`${HOST_NAME}/login`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(loginSuccessData)),
  ),

  rest.post(`${HOST_NAME}/login/fail`, (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: '로그인 실패!' })),
  ),
];

export const customerHandler = [
  // 아이디 유효성 검증
  rest.get(`${HOST_NAME}/customers/username/duplication`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ isUnique: true })),
  ),

  rest.get(`${HOST_NAME}/customers/username/duplication/fail`, (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: '중복된 아이디 입니다' })),
  ),

  // 회원가입
  rest.post(`${HOST_NAME}/customers`, (req, res, ctx) => res(ctx.status(201))),

  rest.post(`${HOST_NAME}/customers/fail`, (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: '회원가입 실패!' })),
  ),

  // 내정보 조회
  rest.get(`${HOST_NAME}/customers/me`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(userInfomationData)),
  ),

  rest.get(`${HOST_NAME}/customers/me/fail`, (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: '회원정보를 가져오는데 실패하였습니다' })),
  ),

  // 패스워드 수정
  rest.put(`${HOST_NAME}/customers/me/password`, (req, res, ctx) => res(ctx.status(200))),

  rest.put(`${HOST_NAME}/customers/me/password/fail`, (req, res, ctx) => {
    res(ctx.status(400), ctx.json({ message: '비밀번호 수정에 실패하였습니다' }));
  }),

  // 내 정보 수정
  rest.put(`${HOST_NAME}/customers/me`, (req, res, ctx) => res(ctx.status(200))),

  rest.put(`${HOST_NAME}/customers/me/fail`, (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: '내 정보 수정에 실패하였습니다' })),
  ),

  // 회원 탈퇴
  rest.delete(`${HOST_NAME}/customers/me`, (req, res, ctx) => res(ctx.status(204))),

  rest.delete(`${HOST_NAME}/customers/me/fail`, (req, res, ctx) =>
    res(ctx.status(400), ctx.json({ message: '회원 탈퇴에 실패하였습니다' })),
  ),
];

export const cartHandler = [
  // 장바구니 상품 목록 조회
  rest.get(`${HOST_NAME}/cart`, (req, res, ctx) => res(ctx.status(200), ctx.json(cartItemsData))),

  // 장바구니 상품 추가
  rest.post(`${HOST_NAME}/cart/:productId`, (req, res, ctx) => {
    const { productId } = req.params;

    if (!productId) return res(ctx.status(400));
    return res(ctx.status(200));
  }),

  // 장바구니 상품 수량 변경
  rest.put(`${HOST_NAME}/cart/:productId/quantity`, (req, res, ctx) => {
    const { productId } = req.params;

    if (!productId) return res(ctx.status(400));
    return res(ctx.status(200));
  }),

  // 장바구니 상품 제거
  rest.delete(`${HOST_NAME}/cart/products`, (req, res, ctx) => res(ctx.status(204))),

  // 장바구니 비우기
  rest.delete(`${HOST_NAME}/cart/products`, (req, res, ctx) => res(ctx.status(204))),

  // 장바구니 상품 구매
  rest.post(`${HOST_NAME}/orders`, (req, res, ctx) => {
    const { productIds } = req.body;

    if (!productIds) return res(ctx.status(400));
    return res(ctx.status(200));
  }),
];
