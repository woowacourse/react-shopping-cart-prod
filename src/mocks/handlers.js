import { rest } from 'msw';

export const handlers = [
  // 회원가입
  rest.post('/customers', (req, res, ctx) => {}),

  // 회원탈퇴
  rest.delete('/customers', (req, res, ctx) => {}),

  // 회원정보수정
  rest.patch('/customers', (req, res, ctx) => {}),

  // 회원조회
  rest.get('/customers', (req, res, ctx) => {}),

  // 로그인
  rest.post('/auth/login', (req, res, ctx) => {}),

  // 로그아웃
  rest.post('/auth/logout', (req, res, ctx) => {}),
];
