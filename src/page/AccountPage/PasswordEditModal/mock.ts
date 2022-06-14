// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import ErrorResponse from 'utils/ErrorResponse';
import { validatePassword } from 'utils/validator';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const changePasswordHandler = rest.patch('/customers/password', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new ErrorResponse(1003, ERROR_MESSAGE_FROM_SERVER[1003], 401);
    }

    const { password, newPassword } = req.body;

    // [ERROR] 비밀번호 형식이 옳지 않은 경우
    validatePassword(newPassword);

    const foundUser = users.find(user => user.id === accessToken.id);

    // [ERROR] 입력된 비밀번호와 현재 비밀번호가 일치하지 않은 경우
    if (foundUser.password !== password) {
      throw new ErrorResponse(2202, ERROR_MESSAGE_FROM_SERVER[2202], 401);
    }

    // 비밀번호 변경 성공
    foundUser.password = newPassword;
    return res(ctx.status(204));
  } catch (error) {
    // 비밀번호 변경 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default changePasswordHandler;
