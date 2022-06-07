// @ts-nocheck
import { dummyProductList } from 'dummy_data';
import { rest } from 'msw';
import {
  checkDuplicatedEmail,
  checkPasswordSame,
  checkUserPassword,
  validateEmail,
  validateNickname,
  validatePassword,
  validateToken,
} from 'utils/validator';

const users = [
  { id: 1, email: '1@gmail.com', nickname: 'abc', password: 'akfmzh123!' },
  { id: 2, email: '2@gmail.com', nickname: 'def', password: '123456@adssd' },
  { id: 3, email: '3@gmail.com', nickname: 'ghi', password: '123456@adssd' },
];

const decodeReqAccessToken = req => {
  console.log(req.headers.headers.authorization);
  console.log(
    typeof JSON.parse(decodeURIComponent(req.headers.headers.authorization).replace('Bearer ', '')),
  );
  return JSON.parse(decodeURIComponent(req.headers.headers.authorization).replace('Bearer ', ''));
};

export const handlers = [
  // 상품 정보 가져오기
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyProductList));
  }),

  // 회원가입
  rest.post('/customers', (req, res, ctx) => {
    const { email, nickname, password } = req.body;
    const id = users.length + 1;

    try {
      // 이메일 형식 준수 여부 확인
      validateEmail(email);
      // 닉네임 형식 준수 여부 확인
      validateNickname(nickname);
      // 비밀번호 형식 준수 여부 확인
      validatePassword(password);

      // 이메일 중복 여부 확인
      checkDuplicatedEmail(users, email);

      // 회원가입 성공
      users.push({ id, email, nickname, password });
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

    const foundUser = users.find(user => user.email === email);

    try {
      const accessToken = JSON.stringify({ id: foundUser.id });

      // 비밀번호 일치 여부 확인
      checkPasswordSame(users, foundUser.id, password);
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

  // 회원정보수정
  rest.patch('/customers', (req, res, ctx) => {
    try {
      const accessToken = decodeReqAccessToken(req);
      // 유효한 토큰 여부 확인
      validateToken(users, accessToken);

      // [1] 닉네임을 수정하는 경우
      const { nickname } = req.body;

      if (nickname) {
        // 닉네임 형식 확인
        validateNickname(nickname);

        // 닉네임 변경 성공
        return res(
          ctx.status(200),
          ctx.json({
            nickname,
          }),
        );
      }

      // [2] 비밀번호를 수정하는 경우
      const { password, newPassword } = req.body;

      // 비밀번호 형식 확인
      validatePassword(newPassword);

      // 비밀번호 일치 여부 확인
      checkPasswordSame(users, accessToken.id, password);

      // 비밀번호 변경 성공
      const foundUserIndex = users.findIndex(user => user.id === accessToken.id);
      users[foundUserIndex].password = newPassword;

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
      validateToken(users, accessToken);

      const { password } = req.body;
      const foundUserIndex = users.findIndex(user => user.id === accessToken.id);

      // 비밀번호 일치 여부 확인
      checkUserPassword(users[foundUserIndex], password);

      // 탈퇴 성공
      users.splice(foundUserIndex, 1);
      return res(ctx.status(204));
    } catch (error) {
      // 탈퇴 실패
      alert(error);
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
      validateToken(users, accessToken);

      const { nickname, email } = users.find(user => user.id === accessToken.id);

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
      validateToken(users, accessToken);

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
