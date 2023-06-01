import { rest } from 'msw';
import { getOrderList } from '../utils/localStorage';

export const orderDetailHandler = [
  rest.get('/orders/:id', (req, res, ctx) => {
    const orderId = Number(req.params.id);

    const orderList = getOrderList();

    const orderDetail = orderList.find((order) => order.orderId === orderId);

    return res(ctx.json(orderDetail), ctx.status(200), ctx.delay(800));
  }),
];
