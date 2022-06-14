// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import ErrorResponse from 'utils/ErrorResponse';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const deleteAccountHandler = rest.delete('/customers', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new ErrorResponse(1003, ERROR_MESSAGE_FROM_SERVER[1003], 401);
    }

    const { password } = req.body;
    const foundUserIndex = users.findIndex(user => user.id === accessToken.id);

    // [ERROR] 입력된 비밀번호가 현재 비밀번호와 일치하지 않는 경우
    if (users[foundUserIndex].password !== password) {
      throw new ErrorResponse(2202, ERROR_MESSAGE_FROM_SERVER[2202], 401);
    }

    // 탈퇴 성공
    users.splice(foundUserIndex, 1);
    return res(ctx.status(204));
  } catch (error) {
    // 탈퇴 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default deleteAccountHandler;
