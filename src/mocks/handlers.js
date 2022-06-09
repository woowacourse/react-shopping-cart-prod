// @ts-nocheck
import { dummyProductList } from 'dummy_data';
import { rest } from 'msw';
import {
  checkDuplicatedEmail,
  checkEmailExist,
  checkPasswordSame,
  checkUserPassword,
  validateEmail,
  validateNickname,
  validatePassword,
  validateToken,
} from 'utils/validator';

const dummyUsers = [
  { id: 1, email: '1@gmail.com', nickname: 'abc', password: 'akfmzh123!' },
  { id: 2, email: '2@gmail.com', nickname: 'def', password: '123456@adssd' },
  { id: 3, email: '3@gmail.com', nickname: 'ghi', password: '123456@adssd' },
];

let dummyCart = [];

const decodeReqAccessToken = req => {
  return JSON.parse(decodeURIComponent(req.headers.headers.authorization).replace('Bearer ', ''));
};

export const handlers = [
  // 1. 상품 목록 가져오기
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyProductList));
  }),

  // 2. 특정 상품 가져오기
  rest.get('/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = dummyProductList.find(product => product.id === +id);
    return res(ctx.status(200), ctx.json(product));
  }),

  // 3. 장바구니 목록 가져오기
  rest.get('/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyCart));
  }),

  // 4. 장바구니 목록에 상품 추가 및 수량 수정하기(PUT)
  rest.put('/cart/products/:id', (req, res, ctx) => {
    const productId = +req.params.id;
    const { quantity: reqQuantity } = req.body;
    const productInCart = dummyCart.find(product => product.productId === productId);
    const { image, name, price } = dummyProductList.find(product => product.id === productId);
    const resProduct = { productId, image, name, price, quantity: reqQuantity };

    if (productInCart) {
      productInCart.quantity = reqQuantity;
      return res(ctx.status(200), ctx.json(resProduct));
    } else {
      dummyCart.push(resProduct);
      return res(ctx.status(200), ctx.json(resProduct));
    }
  }),

  // 5. 장바구니 목록에서 상품 삭제하기(DELETE)
  rest.delete('/cart', (req, res, ctx) => {
    const { productIds } = req.body;
    dummyCart = dummyCart.filter(product => !productIds.includes(product.productId));
    return res(ctx.status(204));
  }),

  // 6. 주문 추가하기(POST)
  rest.post('/orders', (req, res, ctx) => {
    const { productIds } = req.body;
    const orderDetails = dummyCart.filter(product => productIds.includes(product.productId));
    const dummyOrder = {
      id: 5,
      orderDetails,
      totalPrice: 53200,
      orderDate: '2022-03-20 12:23:33',
    };

    return res(ctx.status(201), ctx.json(dummyOrder));
  }),

  // 회원가입
  rest.post('/customers', (req, res, ctx) => {
    const { email, nickname, password } = req.body;
    const id = dummyUsers.length + 1;

    try {
      // 이메일 형식 준수 여부 확인
      validateEmail(email);
      // 닉네임 형식 준수 여부 확인
      validateNickname(nickname);
      // 비밀번호 형식 준수 여부 확인
      validatePassword(password);
      // 이메일 중복 여부 확인
      checkDuplicatedEmail(dummyUsers, email);

      // 회원가입 성공
      dummyUsers.push({ id, email, nickname, password });
      return res(
        ctx.status(201),
        ctx.set('Location', `/customers/${id}`),
        ctx.json({
          email: email,
          nickname: nickname,
        }),
      );
    } catch (error) {
      // 회원가입 실패
      return res(
        ctx.status(400),
        ctx.json({
          code: error.code,
          message: error.message,
        }),
      );
    }
  }),

  // 로그인
  rest.post('/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;

    try {
      // 이메일 존재 여부 확인
      checkEmailExist(dummyUsers, email);
      const foundUser = dummyUsers.find(user => user.email === email);
      const accessToken = JSON.stringify({ id: foundUser.id });

      // 비밀번호 일치 여부 확인
      checkPasswordSame(dummyUsers, foundUser.id, password);
      // 로그인 성공
      return res(
        ctx.status(200),
        ctx.json({
          nickname: foundUser.nickname,
          accessToken,
        }),
      );
    } catch (error) {
      // 로그인 실패
      return res(
        ctx.status(401),
        ctx.json({
          code: error.code,
          message: error.message,
        }),
      );
    }
  }),

  // 닉네임 수정
  rest.patch('/customers/profile', (req, res, ctx) => {
    try {
      const accessToken = decodeReqAccessToken(req);
      // 유효한 토큰 여부 확인
      validateToken(dummyUsers, accessToken);
      const { nickname } = req.body;
      if (nickname) {
        // 닉네임 형식 확인
        validateNickname(nickname);
        // 닉네임 변경 성공
        const foundUser = dummyUsers.find(user => user.id === accessToken.id);
        foundUser.nickname = nickname;

        return res(
          ctx.status(200),
          ctx.json({
            nickname,
          }),
        );
      }
    } catch (error) {
      // 회원정보 수정 실패(입력된 형식 문제면 400, 인가 문제면 401)
      return res(
        ctx.status(error.code === 2103 ? 400 : 401),
        ctx.json({
          code: error.code,
          message: error.message,
        }),
      );
    }
  }),

  // 비밀번호 수정
  rest.patch('/customers/password', (req, res, ctx) => {
    try {
      const accessToken = decodeReqAccessToken(req);
      // 유효한 토큰 여부 확인
      validateToken(dummyUsers, accessToken);
      const { password, newPassword } = req.body;
      // 비밀번호 형식 확인
      validatePassword(newPassword);
      // 비밀번호 일치 여부 확인
      checkPasswordSame(dummyUsers, accessToken.id, password);
      // 비밀번호 변경 성공
      const foundUser = dummyUsers.find(user => user.id === accessToken.id);
      foundUser.password = newPassword;

      return res(ctx.status(204));
    } catch (error) {
      // 회원정보 수정 실패(입력된 형식 문제면 400, 인가 문제면 401)
      return res(
        ctx.status(error.code === 2103 ? 400 : 401),
        ctx.json({
          code: error.code,
          message: error.message,
        }),
      );
    }
  }),

  //회원탈퇴
  rest.delete('/customers', (req, res, ctx) => {
    try {
      const accessToken = decodeReqAccessToken(req);
      // 유효한 토큰 여부 확인
      validateToken(dummyUsers, accessToken);

      const { password } = req.body;
      const foundUserIndex = dummyUsers.findIndex(user => user.id === accessToken.id);

      // 비밀번호 일치 여부 확인
      checkUserPassword(dummyUsers[foundUserIndex], password);

      // 탈퇴 성공
      dummyUsers.splice(foundUserIndex, 1);
      return res(ctx.status(204));
    } catch (error) {
      // 탈퇴 실패
      return res(
        ctx.status(401),
        ctx.json({
          error: error.code,
          message: error.message,
        }),
      );
    }
  }),

  // 회원조회
  rest.get('/customers', (req, res, ctx) => {
    try {
      const accessToken = decodeReqAccessToken(req);

      // 유효한 토큰 여부 확인
      validateToken(dummyUsers, accessToken);

      const { nickname, email } = dummyUsers.find(user => user.id === accessToken.id);

      // 회원 조회 성공
      return res(
        ctx.status(200),
        ctx.json({
          nickname,
          email,
        }),
      );
    } catch (error) {
      // 회원 조회 실패
      return res(
        ctx.status(401),
        ctx.json({
          code: error.code,
          message: error.message,
        }),
      );
    }
  }),

  // 로그아웃
  rest.post('/auth/logout', (req, res, ctx) => {
    try {
      const accessToken = decodeReqAccessToken(req);

      // 유효한 토큰 여부 확인
      validateToken(dummyUsers, accessToken);

      // 로그아웃 성공
      return res(ctx.status(204));
    } catch (error) {
      // 로그아웃 실패
      return res(
        ctx.status(401),
        ctx.json({
          code: error.code,
          message: error.message,
        }),
      );
    }
  }),
];
