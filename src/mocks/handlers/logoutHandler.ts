// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';

const logoutHandler = rest.post('/auth/logout', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, '유효하지 않은 토큰입니다.', 401);
    }

    // 로그아웃 성공
    return res(ctx.status(204));
  } catch (error) {
    // 로그아웃 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default logoutHandler;
