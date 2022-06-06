// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';

const deleteAccountHandler = rest.delete('/customers', (req, res, ctx) => {
  try {
    const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
    // 유효한 토큰이 아닌 경우
    if (!users.some(user => user.id === accessToken.id)) throw new Error();

    const { password } = req.body;
    const foundIndex = users.findIndex(user => user.id === accessToken.id);

    // 탈퇴시 입력한 비밀번호가 현재 비밀번호와 맞지 않은 경우
    if (users[foundIndex].password !== password) {
      throw new Error();
    }

    // 탈퇴 성공
    delete users[foundIndex];
    return res(ctx.status(204));
  } catch (error) {
    // 탈퇴 실패
    return res(
      ctx.status(401),
      ctx.json({
        message: 'No authorization',
      }),
    );
  }
});

export default deleteAccountHandler;
