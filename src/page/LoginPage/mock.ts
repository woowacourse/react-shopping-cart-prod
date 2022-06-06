// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';

const loginHandler = rest.post('/auth/login', (req, res, ctx) => {
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
  // [ERROR] 이메일 혹은 비밀번호가 일치하지 않은 경우
  return res(
    ctx.status(401),
    ctx.json({
      code: 2201,
      message: 'Login Failed',
    }),
  );
});

export default loginHandler;
