// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import { validateNickname } from 'utils/validator';
import CustomError from 'utils/CustomError';

const changeNicknameHandler = rest.patch('/customers/profile', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, '유효하지 않은 토큰입니다.', 401);
    }

    const { nickname } = req.body;

    // [ERROR] 닉네임 형식이 옳지 않은 경우
    validateNickname(nickname);

    const foundUser = users.find(user => user.id === accessToken.id);

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
