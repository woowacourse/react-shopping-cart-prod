// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import { validateNickname, validatePassword } from 'utils/validator';

const updateAccountHandler = rest.patch('/customers', (req, res, ctx) => {
  try {
    const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
    // 유효한 토큰이 아닌 경우
    if (!users.some(user => user.id === accessToken.id)) throw new Error('No authorization');

    // [1] 닉네임을 수정하는 경우
    const { nickname } = req.body;

    if (nickname) {
      // 닉네임 형식이 옳지 않은 경우
      validateNickname(nickname);

      // 닉네임 변경 성공
      return res(
        ctx.status(200),
        ctx.json({
          nickname,
        }),
      );
    }

    // [2] 비밀번호를 수정하는 경우
    const { password, newPassword } = req.body;

    // 비밀번호 형식이 옳지 않은 경우
    validatePassword(newPassword);

    // 이전 비밀번호와 현재 비밀번호가 일치하지 않을 경우
    if (users.find(user => user.id === accessToken.id).password !== password) {
      throw new Error('No authorization');
    }

    // 비밀번호 변경 성공
    return res(ctx.status(204));
  } catch (error) {
    // 회원정보 수정 실패
    return res(
      ctx.status(error.message === 'No authorization' ? 401 : 400),
      ctx.json({
        message: error.message,
      }),
    );
  }
});

export default updateAccountHandler;
