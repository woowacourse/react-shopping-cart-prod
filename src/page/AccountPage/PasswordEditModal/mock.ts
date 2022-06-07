// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';
import { validatePassword } from 'utils/validator';

const changePasswordHandler = rest.patch('/customers/password', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, '유효하지 않은 토큰입니다.', 401);
    }

    const { password, newPassword } = req.body;

    // [ERROR] 비밀번호 형식이 옳지 않은 경우
    validatePassword(newPassword);

    // [ERROR] 입력된 비밀번호와 현재 비밀번호가 일치하지 않은 경우
    if (users.find(user => user.id === accessToken.id).password !== password) {
      throw new CustomError(2202, '입력된 비밀번호가 현재 비밀번호와 일치하지 않습니다.', 401);
    }

    // 비밀번호 변경 성공
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
