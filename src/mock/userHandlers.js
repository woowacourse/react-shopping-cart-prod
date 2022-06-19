import { ERROR_MESSAGE } from 'constants';
import { rest } from 'msw';

let users = [
  {
    name: 'test',
    email: 'test@gmail.com',
    password: 'test1234',
    token: 1234123412341234,
  },
];

const parseToken = (req) =>
  Number(req.headers._headers.authorization.replace('Bearer ', ''));

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body.data;
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res(
        ctx.status(403),
        ctx.json({
          message: '유저가 없다구!',
        }),
      );
    }

    if (user.password !== password) {
      return res(
        ctx.status(403),
        ctx.json({
          message: '비밀번호가 이상하다구!',
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        accessToken: user.token,
      }),
    );
  }),

  rest.post('/api/customer', (req, res, ctx) => {
    const { name, email, password } = req.body.data;
    const user = users.find((user) => user.email === email);
    if (user) {
      return res(
        ctx.status(403),
        ctx.json({
          message: '이미 존재하는 이메일 입니다.',
        }),
      );
    }
    users.push({ name, email, password, token: '321321' });

    return res(ctx.status(201));
  }),

  rest.get('/api/customer', (req, res, ctx) => {
    const token = parseToken(req);
    const user = users.find((user) => user.token === token);

    if (!user) {
      return res(
        ctx.status(403),
        ctx.json({ message: ERROR_MESSAGE.INVALID_TOKEN }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        name: user.name,
        email: user.email,
      }),
    );
  }),

  rest.put('/api/customer', (req, res, ctx) => {
    const token = parseToken(req);
    const user = users.find((user) => user.token === token);

    if (!user) {
      return res(
        ctx.status(403),
        ctx.json({ message: ERROR_MESSAGE.INVALID_TOKEN }),
      );
    }

    user.name = req.body.data.name;

    return res(ctx.status(200));
  }),

  rest.delete('/api/customer', (req, res, ctx) => {
    const token = parseToken(req);
    const user = users.find((user) => user.token === token);
    const password = req.body.password;

    if (!user) {
      return res(
        ctx.status(403),
        ctx.json({ message: '너 이미 회원 아닌데..?' }),
      );
    }

    if (user.password !== password) {
      return res(ctx.status(403), ctx.json({ message: '비밀번호 확인해!' }));
    }

    users = users.filter((user) => user.token !== token);

    return res(ctx.status(200));
  }),
];
