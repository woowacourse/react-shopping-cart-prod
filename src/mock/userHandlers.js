import { rest } from 'msw';

const createToken = () => Date.now();

const users = [
  {
    name: 'test',
    email: 'test@google.com',
    password: 'test1234',
    token: '',
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res(
        ctx.status(403, {
          message: 'No User',
        }),
      );
    }

    if (user.password !== password) {
      return res(
        ctx.status(403, {
          message: 'Password is Not Correct',
        }),
      );
    }

    user.token = createToken();
    return res(
      ctx.status(200, {
        accessToken: user.token,
      }),
    );
  }),
];
