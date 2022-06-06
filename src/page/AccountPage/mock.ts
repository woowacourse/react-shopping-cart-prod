// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import { validateNickname } from 'utils/validator';

const changeNicknameHandler = rest.patch('/customers/profile', (req, res, ctx) => {
  try {
    const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
    // [ERROR] 유효한 토큰이 아닌 경우
    if (!users.some(user => user.id === accessToken.id)) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 1003,
          message: '유효하지 않은 토큰입니다.',
        }),
      );
    }

    const { nickname } = req.body;

    // [ERROR] 닉네임 형식이 옳지 않은 경우
    validateNickname(nickname);

    // 닉네임 변경 성공
    return res(
      ctx.status(200),
      ctx.json({
        nickname,
      }),
    );
  } catch (error) {
    // 닉네임 변경 실패
    return res(
      ctx.status(400),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default changeNicknameHandler;
