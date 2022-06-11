// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const userInquiryHandler = rest.get('/customers', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, ERROR_MESSAGE_FROM_SERVER[1003], 401);
    }

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
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default userInquiryHandler;
