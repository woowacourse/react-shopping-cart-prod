import { rest } from 'msw';
import productList from './dummyData';

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.post('/api/customers', (req, res, ctx) => {
    const { userName, password } = req.body;
    const customers = JSON.parse(localStorage.getItem('customers')) ?? [];

    customers.push({ userName, password, accessToken: `accessToken_${userName}` });
    localStorage.setItem('customers', JSON.stringify(customers));

    return res(ctx.status(201));
  }),

  rest.post('/api/customers/duplication', (req, res, ctx) => {
    const { userName } = req.body;
    const customers = JSON.parse(localStorage.getItem('customers')) ?? [];
    const isDuplicateUserName =
      customers.find((customer) => customer.userName === userName) !== undefined;

    return res(ctx.json(isDuplicateUserName));
  }),

  rest.get('/api/customers/me', (req, res, ctx) => {
    const { authorization } = req.headers._headers;

    if (!authorization) return res(ctx.status(400));

    const customers = JSON.parse(localStorage.getItem('customers')) ?? [];
    const user = customers.find((customer) => customer.accessToken === authorization.split(' ')[1]);

    if (!user) return res(ctx.status(400));

    return res(ctx.status(200), ctx.json(user.userName));
  }),

  rest.put('/api/customers/me', (req, res, ctx) => {
    const { authorization } = req.headers._headers;
    const { password } = req.body;

    if (!authorization) return res(ctx.status(400));

    const customers = JSON.parse(localStorage.getItem('customers')) ?? [];
    const user = customers.find((customer) => customer.accessToken === authorization.split(' ')[1]);

    user.password = password;
    localStorage.setItem('customers', JSON.stringify(customers));

    return res(ctx.status(200));
  }),

  rest.delete('/api/customers/me', (req, res, ctx) => {
    const { authorization } = req.headers._headers;

    if (!authorization) return res(ctx.status(400));

    const customers = JSON.parse(localStorage.getItem('customers')) ?? [];
    const userIndex = customers.findIndex(
      (customer) => customer.accessToken === authorization.split(' ')[1]
    );

    customers.splice(userIndex, 1);
    localStorage.setItem('customers', JSON.stringify(customers));

    return res(ctx.status(204));
  }),

  rest.post('/api/login', (req, res, ctx) => {
    const { userName, password } = req.body;
    const customers = JSON.parse(localStorage.getItem('customers')) ?? [];
    const loginUser = customers.find(
      (customer) => customer.userName === userName && customer.password === password
    );

    if (!loginUser) return res(ctx.status(400));

    loginUser.accessToken = `accessToken_${userName}`;

    return res(ctx.status(200), ctx.json(`accessToken_${userName}`));
  }),
];
