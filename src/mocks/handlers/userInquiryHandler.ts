// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';

const userInquiryHandler = rest.get('/customers', (req, res, ctx) => {
  try {
    const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
    // 유효한 토큰이 아닌 경우
    if (!users.some(user => user.id === accessToken.id)) throw new Error();

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
      ctx.status(401),
      ctx.json({
        message: 'No authorization',
      }),
    );
  }
});

export default userInquiryHandler;
