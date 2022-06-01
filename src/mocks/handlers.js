import { rest } from 'msw';

const users = [
  { id: 1, email: '1@gmail.com', nickname: 'abc', password: '123456@adssd' },
  { id: 2, email: '2@gmail.com', nickname: 'def', password: '123456@adssd' },
  { id: 3, email: '3@gmail.com', nickname: 'ghi', password: '123456@adssd' },
];

export const handlers = [
  // 회원가입
  rest.post('/customers', (req, res, ctx) => {
    // @ts-ignore
    const { email, nickname, password } = req.body;

    users.push({ id: users.length + 1, email, nickname, password });

    return res(
      ctx.status(201),
      ctx.json({
        email: email,
        nickname: nickname,
      }),
    );
  }),

  // 로그인
  rest.post('/auth/login', (req, res, ctx) => {
    // @ts-ignore
    const { email, password } = req.body;

    const foundUser = users.find(user => user.email === email);
    if (foundUser && foundUser.password === password) {
      const accessToken = JSON.stringify({ id: foundUser.id });

      return res(
        ctx.status(200),
        ctx.json({
          nickname: foundUser.nickname,
          accessToken,
        }),
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        code: 400,
        message: 'Login Failed',
      }),
    );
  }),

  // 회원정보수정
  rest.patch('/customers', (req, res, ctx) => {
    try {
      // @ts-ignore
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      if (!users.some(user => user.id === accessToken.id)) throw new Error();

      // @ts-ignore
      const { nickname } = req.body;

      // 닉네임 변경완료
      if (nickname) {
        return res(
          ctx.status(200),
          ctx.json({
            nickname,
          }),
        );
      }

      // 비밀번호 변경완료
      return res(ctx.status(204));
    } catch (error) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 400,
          message: 'No authorization',
        }),
      );
    }
  }),

  // 회원탈퇴
  rest.delete('/customers', (req, res, ctx) => {
    try {
      // @ts-ignore
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      if (!users.some(user => user.id === accessToken.id)) throw new Error();

      // TODO 비밀번호 일치여부 확인 필요(delete 메서드 대신 post 등 검토 필요, 왜냐하면 payload 전달이 필요하므로)
      const foundIndex = users.findIndex(user => user.id === accessToken.id);
      delete users[foundIndex];

      return res(ctx.status(204));
    } catch (error) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 400,
          message: 'No authorization',
        }),
      );
    }
  }),

  // 회원조회
  rest.get('/customers', (req, res, ctx) => {
    try {
      // @ts-ignore
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      if (!users.some(user => user.id === accessToken.id)) throw new Error();

      const { nickname, email } = users.find(user => user.id === accessToken.id);

      return res(
        ctx.status(200),
        ctx.json({
          nickname,
          email,
        }),
      );
    } catch (error) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 400,
          message: 'No authorization',
        }),
      );
    }
  }),

  // 로그아웃
  rest.post('/auth/logout', (req, res, ctx) => {
    try {
      // @ts-ignore
      const accessToken = JSON.parse(req.headers.headers.authorization.replace('Bearer ', ''));
      if (!users.some(user => user.id === accessToken.id)) throw new Error();

      return res(ctx.status(204));
    } catch (error) {
      return res(
        ctx.status(401),
        ctx.json({
          code: 400,
          message: 'No authorization',
        }),
      );
    }
  }),
];
