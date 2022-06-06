import { CUSTOMERS_API_URL } from '@/api/constants';
import { rest } from 'msw';
import { customerList } from '../data/customer';

const checkAccessToken = ({
  successStatusCode,
  successStatusMessage,
  callback,
  payload = {},
  headers,
  res,
  ctx,
}) => {
  const accessToken = headers['_headers'].authorization.split('Bearer ')[1];

  if (customerList.current.every(customer => customer.username !== accessToken)) {
    return res(
      ctx.status(401, 'unauthorized'),
      ctx.json({ error: { messages: ['잘못된 토큰 정보입니다.'] } }),
    );
  }

  callback(accessToken, payload);

  return res(ctx.status(successStatusCode, successStatusMessage));
};

const deleteCustomer = accessToken =>
  (customerList.current = customerList.current.filter(
    customer => customer.username !== accessToken,
  ));

const changePassword = (accessToken, payload) =>
  (customerList.current = customerList.current.map(customer => {
    if (customer.username === accessToken) {
      return {
        ...customer,
        ...payload,
      };
    }
    return customer;
  }));

const changeUserInformation = (accessToken, payload) =>
  (customerList.current = customerList.current.map(customer => {
    if (customer.username === accessToken) {
      return {
        ...customer,
        ...payload,
      };
    }
    return customer;
  }));

export const customerHanlders = [
  rest.get(CUSTOMERS_API_URL.TO_CUSTOMERS, (req, res, ctx) => {
    const { headers } = req;
    const accessToken = headers['_headers'].authorization.split('Bearer ')[1];

    const customer = customerList.current.find(customer => customer.username === accessToken);

    if (!customer) {
      return res(
        ctx.status(401, 'unauthorized'),
        ctx.json({ error: { messages: ['잘못된 토큰 정보입니다.'] } }),
      );
    }

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

  rest.post(CUSTOMERS_API_URL.TO_SIGNUP, (req, res, ctx) => {
    const { body: customer } = req;

    customerList.current.push(customer);

    return res(ctx.delay(2000), res => {
      res.statusText = 'Created';
      return res;
    });
  }),

  rest.post(CUSTOMERS_API_URL.TO_LOGIN, (req, res, ctx) => {
    const { username, password } = req.body;

    if (
      customerList.current.some(
        customer => customer.username === username && customer.password === password,
      )
    ) {
      return res(ctx.status(200, 'ok'), ctx.json({ accessToken: username }));
    }

    return res(
      ctx.status(401, 'unauthorized'),
      ctx.json({ error: { messages: ['login failed'] } }),
    );
  }),

  rest.put(CUSTOMERS_API_URL.TO_CUSTOMERS, (req, res, ctx) => {
    const { phoneNumber, address } = req.body;
    const { headers } = req;

    return checkAccessToken({
      successStatusCode: 200,
      successStatusMessage: 'ok',
      callback: changeUserInformation,
      headers,
      payload: { phoneNumber, address },
      res,
      ctx,
    });
  }),

  rest.patch(CUSTOMERS_API_URL.TO_PASSWORD, (req, res, ctx) => {
    const { password } = req.body;
    const { headers } = req;

    return checkAccessToken({
      successStatusCode: 204,
      successStatusMessage: 'no-content',
      callback: changePassword,
      headers,
      payload: { password },
      res,
      ctx,
    });
  }),

  rest.delete(CUSTOMERS_API_URL.TO_CUSTOMERS, (req, res, ctx) => {
    const { headers } = req;

    return checkAccessToken({
      successStatusCode: 204,
      successStatusMessage: 'no-content',
      callback: deleteCustomer,
      headers,
      res,
      ctx,
    });
  }),
];
