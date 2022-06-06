import {rest} from 'msw';
import {MOCK_PRODUCT_LIST} from './mockData';
import shortid from 'shortid';

let cart = [];

let userDB = {
  winnieToken: {
    account: 'winnie0512',
    password: 'Kyj123456!',
    nickname: '위니',
    address: '공릉',
    phoneNumber: {
      start: '010',
      middle: '1234',
      last: '5678',
    },
  },
  nineToken: {
    account: 'jhy979',
    password: 'Abc12345!',
    nickname: '나인',
    address: '하남',
    phoneNumber: {
      start: '010',
      middle: '1111',
      last: '2222',
    },
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
    const {account, password} = req.body;
    const accessToken = Object.keys(userDB).find(
      (token) => userDB[token].account === account && userDB[token].password === password,
    );

    if (!accessToken) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json({accessToken}));
  }),

  // 회원가입
  rest.post(process.env.REACT_APP_SIGN_UP_API_URL, (req, res, ctx) => {
    const accounts = Object.values(userDB).map(({account}) => account);

    const isDuplicated = accounts.some((account) => req.body.account === account);

    if (isDuplicated) {
      return res(ctx.status(404));
    }

    const accessToken = shortid.generate();
    userDB[accessToken] = req.body;

    return res((res) => {
      res.status = 201;
      res.headers.set('Location', '/signin');
      return res;
    });
  }),

  // 사용자 정보 조회
  rest.get(process.env.REACT_APP_GET_INFO_API_URL, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization.split(' ')[1];

    if (!Object.hasOwnProperty.call(userDB, accessToken)) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(userDB[accessToken]));
  }),

  // 사용자 정보 수정
  rest.put(process.env.REACT_APP_EDIT_INFO_API_URL, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization.split(' ')[1];

    if (!Object.hasOwnProperty.call(userDB, accessToken)) {
      return res(ctx.status(404));
    }

    userDB[accessToken] = {
      ...userDB[accessToken],
      ...req.body,
    };

    return res(ctx.status(200));
  }),

  // 회원 탈퇴
  rest.delete(process.env.REACT_APP_WITHDRAWAL_API_URL, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization.split(' ')[1];
    if (req.body.password !== userDB[accessToken].password) {
      return res(ctx.status(404));
    }

    delete userDB[accessToken];

    return res(ctx.status(204));
  }),
];
