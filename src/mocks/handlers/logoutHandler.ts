// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';

const logoutHandler = rest.post('/auth/logout', (req, res, ctx) => {
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
});

export default logoutHandler;
