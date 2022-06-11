// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';
import { validateEmail, validateNickname, validatePassword } from 'utils/validator';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const signupHandler = rest.post('/customers', (req, res, ctx) => {
  const { email, nickname, password } = req.body;
  const id = users.length + 1;

  try {
    // [ERROR] 이메일 형식이 지켜지지 않은 경우
    validateEmail(email);
    // [ERROR] 닉네임 형식이 지켜지지 않은 경우
    validateNickname(nickname);
    // [ERROR] 비밀번호 형식이 지켜지지 않은 경우
    validatePassword(password);

    // [ERROR] 이메일 중복될 경우
    if (users.some(user => user.email === email)) {
      throw new CustomError(2001, ERROR_MESSAGE_FROM_SERVER[2001], 400);
    }

    // 회원가입 성공
    users.push({ id, email, nickname, password });
    return res(
      ctx.status(201),
      ctx.set('Location', `/customers/${id}`),
      ctx.json({
        email: email,
        nickname: nickname,
      }),
    );
  } catch (error) {
    // 회원가입 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default signupHandler;
