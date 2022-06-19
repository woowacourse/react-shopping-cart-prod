/* eslint-disable arrow-body-style */
import { rest } from 'msw';

import { MOCK_DB } from 'mocks/db';

const membersDB = MOCK_DB.members;
const cartDB = MOCK_DB.cart;

const cartHandlers = [
  rest.get('./auth/customer/cartItems', (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization').replace('Bearer ', '');
    const userInfo = membersDB.find((user) => user.accessToken === accessToken);
    if (!userInfo) {
      return res(
        ctx.status(400),
        ctx.json({ message: '권한이 없거나, 존재하지 않는 정보입니다.' }),
      );
    }

    return res(ctx.json(cartDB), ctx.set({ 'x-total-count': cartDB.length }));
  }),

  rest.post('./auth/customer/cartItems', (req, res, ctx) => {
    const insertID = cartDB.length;
    const insertData = { ...req.body, id: insertID, quantity: 1 };

    cartDB.push(insertData);

    return res(ctx.json(insertData), ctx.set({ 'x-total-count': cartDB.length }));
  }),

  rest.patch('./auth/customer/cartItems', (req, res, ctx) => {
    const targetId = req.body.id;
    const targetIndex = cartDB.findIndex(({ id }) => id === targetId);

    Object.entries(req.body).forEach(([key, value]) => {
      cartDB[targetIndex][key] = value;
    });

    return res(ctx.json(cartDB[targetIndex]));
  }),

  rest.delete('./auth/customer/cartItems', (req, res, ctx) => {
    const targetIdList = req.body.map((item) => item.id);

    targetIdList.forEach((targetId) => {
      const targetIndex = cartDB.findIndex(({ id }) => id === targetId);
      cartDB.slice(targetIndex, 1);
    });

    return res(ctx.json({}));
  }),
];

export default cartHandlers;
