import { API_URL } from '@/api/constants';
import { rest } from 'msw';
import { orderList } from '../data/order';

export const orderHanlders = [
  rest.get(`${API_URL}/orders`, (req, res, ctx) => {
    return res(ctx.json({ orders: orderList }));
  }),

  rest.get(`${API_URL}/orders/:orderId`, (req, res, ctx) => {
    const {
      params: { orderId },
    } = req;

    const order = orderList.find(order => order.id === Number(orderId));

    return res(ctx.json({ order }));
  }),
];
