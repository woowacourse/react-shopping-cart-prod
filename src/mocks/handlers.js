import {rest} from 'msw';
import {MOCK_PRODUCT_LIST} from './mockData';

let cart = [];
let info = {
  account: 'leo0842',
  nickname: '에덴',
  address: '에덴동산',
  phoneNumber: {
    start: '010',
    middle: '1234',
    last: '2345',
  },
};

export const handlers = [
  // 상품 리스트 가져오기
  rest.get(process.env.REACT_APP_PRODUCT_API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_PRODUCT_LIST));
  }),

  // 선택된 상품 정보 가져오기
  rest.get(`${process.env.REACT_APP_PRODUCT_API_URL}/:id`, (req, res, ctx) => {
    const productId = Number.parseInt(req.params.id);
    const detailItem = MOCK_PRODUCT_LIST.find(({id}) => id === productId);

    return res(ctx.status(200), ctx.json(detailItem));
  }),

  // 장바구니 상품 리스트 가져오기
  rest.get(process.env.REACT_APP_CART_API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart));
  }),

  // 장바구니 상품 추가
  rest.post(process.env.REACT_APP_CART_API_URL, (req, res, ctx) => {
    const {id: productId} = req.body;
    const isInCart = cart.some(({id}) => id === Number.parseInt(productId));

    if (isInCart) {
      return res(ctx.status(404));
    }

    cart.push(req.body);

    return res(ctx.status(200));
  }),

  // 장바구니 상품 삭제
  rest.delete(`${process.env.REACT_APP_CART_API_URL}/:id`, (req, res, ctx) => {
    const productId = Number.parseInt(req.params.id);
    const isInCart = cart.some(({id}) => id === productId);

    if (!isInCart) {
      return res(ctx.status(404));
    }

    const newCart = cart.filter(({id}) => id !== productId);
    cart = newCart;

    return res(ctx.status(200));
  }),

  // 장바구니 상품 수량 변경하기
  rest.patch(`${process.env.REACT_APP_CART_API_URL}/:id`, (req, res, ctx) => {
    const productId = Number.parseInt(req.params.id);
    const {quantity} = req.body;
    const isInCart = cart.some(({id}) => id === productId);

    if (!isInCart) {
      return res(ctx.status(404));
    }

    const newCart = cart.map((item) => {
      return item.id === productId ? {...item, quantity} : item;
    });

    cart = newCart;

    return res(ctx.status(200));
  }),

  // 로그인
  rest.post(process.env.REACT_APP_LOGIN_API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'}));
  }),

  // 회원가입
  rest.post(process.env.REACT_APP_SIGNUP_API_URL, (req, res, ctx) => {
    return res((res) => {
      res.status = 201;
      res.headers.set('Location', '/signin');
      return res;
    });
  }),

  // 사용자 정보 조회
  rest.get(process.env.REACT_APP_GET_INFO_API_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(info));
  }),

  // 사용자 정보 수정
  rest.put(process.env.REACT_APP_EDIT_INFO_API_URL, (req, res, ctx) => {
    info = {
      ...info,
      ...req.body,
    };
    return res(ctx.status(200));
  }),
];
