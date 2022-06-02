import { products, customers } from 'mocks/mockData';
import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_HOST}/product`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(products))
  ),
  rest.post(`${process.env.REACT_APP_API_HOST}/customers/login`, (req, res, ctx) => {
    const { email, password } = req.body;

    const isExist = customers[email]?.password === password;

    if (isExist) {
      const { password, ...safefyUserInfo } = customers[email];
      return res(ctx.status(200), ctx.json({ accessToken: 1, ...safefyUserInfo }));
    }
    return res(ctx.status(404), ctx.json({ message: '존재하지 않는 email/password입니다.' }));
  }),
  rest.post(`${process.env.REACT_APP_API_HOST}/customers/email`, (req, res, ctx) => {
    const { email } = req.body;

    const isExist = customers[email];

    return res(ctx.status(200), ctx.json({ isValidEmail: isExist }));
  }),
  rest.post(`${process.env.REACT_APP_API_HOST}/customers`, (req, res, ctx) => {
    const { email, password, name, phone, address } = req.body;

    customers[email] = {
      password,
      name,
      phone,
      address,
    };

    return res(ctx.status(201), ctx.json({ email, name, phone, address }));
  }),
];
