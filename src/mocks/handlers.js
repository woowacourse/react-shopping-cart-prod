// @ts-nocheck
import { rest } from 'msw';
import { validateEmail, validateNickname, validatePassword } from 'utils/validator';

const users = [
  { id: 1, email: '1@gmail.com', nickname: 'abc', password: '123456@adssd' },
  { id: 2, email: '2@gmail.com', nickname: 'def', password: '123456@adssd' },
  { id: 3, email: '3@gmail.com', nickname: 'ghi', password: '123456@adssd' },
];

export const handlers = [
  // 회원가입
  rest.post('/customers', (req, res, ctx) => {
    const { email, nickname, password } = req.body;
    const id = users.length + 1;

    try {
      // 이메일 형식이 지켜지지 않은 경우
      validateEmail(email);
      // 닉네임 형식이 지켜지지 않은 경우
      validateNickname(nickname);
      // 비밀번호 형식이 지켜지지 않은 경우
      validatePassword(password);

      // 이메일 중복될 경우
      if (users.some(user => user.email === email)) {
        throw new Error('Duplicated email');
      }

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
          message: error.message,
        }),
      );
    }
  }),

  // 로그인
  rest.post('/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;

    const foundUser = users.find(user => user.email === email);
    if (foundUser && foundUser.password === password) {
      const accessToken = JSON.stringify({ id: foundUser.id });

      // 로그인 성공
      return res(
        ctx.status(200),
        ctx.json({
          nickname: foundUser.nickname,
          accessToken,
        }),
      );
    }

    // 로그인 실패
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Login Failed',
      }),
    );
  }),

  // 회원정보수정
  rest.patch('/customers', (req, res, ctx) => {
    try {
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      // 유효한 토큰이 아닌 경우
      if (!users.some(user => user.id === accessToken.id)) throw new Error('No authorization');

      // [1] 닉네임을 수정하는 경우
      const { nickname } = req.body;

      if (nickname) {
        // 닉네임 형식이 옳지 않은 경우
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

      // 비밀번호 형식이 옳지 않은 경우
      validatePassword(newPassword);

      // 이전 비밀번호와 현재 비밀번호가 일치하지 않을 경우
      if (users.find(user => user.id === accessToken.id).password !== password) {
        throw new Error('No authorization');
      }

      // 비밀번호 변경 성공
      return res(ctx.status(204));
    } catch (error) {
      // 회원정보 수정 실패
      return res(
        ctx.status(error.message === 'No authorization' ? 401 : 400),
        ctx.json({
          message: error.message,
        }),
      );
    }
  }),

  //회원탈퇴
  rest.delete('/customers', (req, res, ctx) => {
    try {
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      // 유효한 토큰이 아닌 경우
      if (!users.some(user => user.id === accessToken.id)) throw new Error();

      const { password } = req.body;
      const foundIndex = users.findIndex(user => user.id === accessToken.id);

      // 탈퇴시 입력한 비밀번호가 현재 비밀번호와 맞지 않은 경우
      if (users[foundIndex].password !== password) {
        throw new Error();
      }

      // 탈퇴 성공
      delete users[foundIndex];
      return res(ctx.status(204));
    } catch (error) {
      // 탈퇴 실패
      return res(
        ctx.status(401),
        ctx.json({
          message: 'No authorization',
        }),
      );
    }
  }),

  // 회원조회
  rest.get('/customers', (req, res, ctx) => {
    try {
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      // 유효한 토큰이 아닌 경우
      if (!users.some(user => user.id === accessToken.id)) throw new Error();

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
          message: 'No authorization',
        }),
      );
    }
  }),

  // 로그아웃
  rest.post('/auth/logout', (req, res, ctx) => {
    try {
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      // 유효한 토큰이 아닌 경우
      if (!users.some(user => user.id === accessToken.id)) throw new Error();

      // 로그아웃 성공
      return res(ctx.status(204));
    } catch (error) {
      // 로그아웃 실패
      return res(
        ctx.status(401),
        ctx.json({
          message: 'No authorization',
        }),
      );
    }
  }),
];
