import { API_URL } from '@/api/constants';
import { rest } from 'msw';
import { customerList } from '../data/customer';

const parseAccessTokenValue = responseHeader => {
  return responseHeader['_headers'].authorization.split('Bearer ')[1];
};

const checkAuthorization = accessToken => {
  return customerList.current.every(customer => customer.username !== accessToken);
};

const withAuthorization = (req, res, ctx, callback) => {
  const { headers } = req;

  const accessToken = parseAccessTokenValue(headers);

  if (checkAuthorization(accessToken)) {
    return res(
      ctx.status(401, 'unauthorized'),
      ctx.json({ error: { messages: ['잘못된 토큰 정보입니다.'] } }),
    );
  }

  return callback(req, res, ctx, accessToken);
};

export const customerHanlders = [
  rest.get(`${API_URL}/customers`, (req, res, ctx) =>
    withAuthorization(req, res, ctx, accessToken => {
      const customer = customerList.current.find(customer => customer.username === accessToken);

      return res(
        ctx.status(200, 'ok'),
        ctx.json({
          customer: {
            username: customer.username,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
          },
        }),
      );
    }),
  ),

  rest.post(`${API_URL}/customers/signup`, (req, res, ctx) => {
    const { body: customer } = req;

    customerList.current.push(customer);

    return res(res => {
      res.statusText = 'Created';
      return res;
    });
  }),

  rest.post(`${API_URL}/customers/login`, (req, res, ctx) => {
    const { username, password } = req.body;

    if (
      customerList.current.some(
        customer => customer.username === username && customer.password === password,
      )
    ) {
      return res(ctx.status(200, 'ok'), ctx.json({ accessToken: username }));
    }

    return res(
      ctx.status(400, 'unauthorized'),
      ctx.json({ error: { messages: ['login failed'] } }),
    );
  }),

  rest.put(`${API_URL}/customers`, (req, res, ctx) =>
    withAuthorization(req, res, ctx, accessToken => {
      const { phoneNumber, address } = req.body;

      customerList.current = customerList.current.map(customer =>
        customer.username === accessToken
          ? {
              ...customer,
              phoneNumber,
              address,
            }
          : customer,
      );

      return res(ctx.status(200, 'ok'));
    }),
  ),

  rest.patch(`${API_URL}/customers/password`, (req, res, ctx) =>
    withAuthorization(req, res, ctx, accessToken => {
      const { password } = req.body;

      customerList.current = customerList.current.map(customer =>
        customer.username === accessToken
          ? {
              ...customer,
              password,
            }
          : customer,
      );

      return res(ctx.status(204, 'no-content'));
    }),
  ),

  rest.delete(`${API_URL}/customers`, (req, res, ctx) =>
    withAuthorization(req, res, ctx, accessToken => {
      customerList.current = customerList.current.filter(
        customer => customer.username !== accessToken,
      );

      return res(ctx.status(204, 'no-content'));
    }),
  ),
];
