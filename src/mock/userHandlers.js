import { rest } from 'msw';

const createToken = () => Date.now();

const users = [
  {
    name: 'test',
    email: 'test@gmail.com',
    password: 'test1234',
    token: '',
  },
];

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

    user.token = createToken();
    console.log(users);
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

    users.push({ name, email, password, token: '' });

    return res(ctx.status(201));
  }),

  rest.get('/api/customer', (req, res, ctx) => {
    const token = Number(
      req.headers._headers.authorization.replace('Bearer ', ''),
    );
    const user = users.find((user) => user.token === token);

    if (!user) {
      return res(ctx.status(403), ctx.json({ message: 'Invalid Token' }));
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
    const token = Number(req.headers.authorization.replace('Bearer ', ''));
    const user = users.find((user) => user.token === token);

    if (!user) {
      return res(ctx.status(403), ctx.json({ message: 'Invalid Token' }));
    }

    user.name = req.body.data.name;

    return res(ctx.status(200));
  }),
];
