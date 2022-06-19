// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import { validateNickname } from 'utils/validator';
import ErrorResponse from 'utils/ErrorResponse';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const changeNicknameHandler = rest.patch('/customers/profile', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.sub)) {
      throw new ErrorResponse(1003, ERROR_MESSAGE_FROM_SERVER[1003], 401);
    }

    const { nickname } = req.body;

    // [ERROR] 닉네임 형식이 옳지 않은 경우
    validateNickname(nickname);

    const foundUser = users.find(user => user.id === accessToken.sub);

    // 닉네임 변경 성공
    foundUser.nickname = nickname;
    return res(
      ctx.status(200),
      ctx.json({
        nickname,
      }),
    );
  } catch (error) {
    // 닉네임 변경 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default changeNicknameHandler;
