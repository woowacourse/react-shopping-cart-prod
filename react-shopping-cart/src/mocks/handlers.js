import { products, customers } from 'mocks/mockData';
import { rest } from 'msw';

import { API_URL_PATH } from 'constants/api';

export const handlers = [
  rest.get(`${API_URL_PATH.PRODUCTS}`, (req, res, ctx) => res(ctx.status(200), ctx.json(products))),
  rest.post(`${API_URL_PATH.LOGIN}`, (req, res, ctx) => {
    const { email, password } = req.body;

    const isExist = customers[email]?.password === password;

    if (isExist) {
      return res(ctx.status(200), ctx.json({ accessToken: 1 }));
    }
    return res(ctx.status(404), ctx.json({ message: '존재하지 않는 email/password입니다.' }));
  }),
  rest.post(`${API_URL_PATH.EMAIL}`, (req, res, ctx) => {
    const email = req.body;

    const isExist = !!customers[email];

    if (isExist) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200));
  }),
  rest.get(`${API_URL_PATH.CUSTOMERS}`, (req, res, ctx) => {
    const email = 'abc@abc.com';
    const { password, ...rest } = customers[email];

    return res(ctx.status(200), ctx.json({ email, ...rest }));
  }),
  rest.post(`${API_URL_PATH.CUSTOMERS}`, (req, res, ctx) => {
    const { email, password, name, phone, address } = req.body;

    customers[email] = {
      password,
      name,
      phone,
      address,
    };

    return res(ctx.status(201), ctx.json({ email, name, phone, address }));
  }),
  rest.put(`${API_URL_PATH.CUSTOMERS}`, (req, res, ctx) => {
    const { email, password, name, phone, address } = req.body;

    customers[email] = {
      password,
      name,
      phone,
      address,
    };

    return res(ctx.status(200));
  }),
  rest.get(`${API_URL_PATH.NAME}`, (req, res, ctx) => {
    const { authorization: raw } = req.headers._headers;
    const authorization = raw.replace('Bearer', '');
    if (authorization) {
      return res(ctx.status(200), ctx.json(customers['abc@abc.com'].name));
    }
    return res(ctx.status(401));
  }),
];
