import { rest } from 'msw';

import orders from '../data/orders.json';
import { ORDER_STORAGE_ID } from '../../constants/storage';
import type { OrderInfo } from '../../types/order';

export const orderHandlers = [
  rest.get('/orders', (_, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(orders));
  }),

  rest.post<OrderInfo>('/orders', (req, res, ctx) => {
    const storedOrders: OrderInfo[] = JSON.parse(
      localStorage.getItem(ORDER_STORAGE_ID) ?? '[]'
    );

    localStorage.setItem(
      ORDER_STORAGE_ID,
      JSON.stringify([...storedOrders, req.body])
    );

    return res(ctx.status(201), ctx.json({ message: 'Success to Create' }));
  }),

  rest.get('/orders/:orderId', (req, res, ctx) => {
    const { orderId } = req.params;

    const targetOrderId = Number(orderId as string);

    const targetOrder = orders.find((order) => order.orderId === targetOrderId);

    if (!targetOrder) {
      return res(ctx.status(304), ctx.json({ message: 'Not in the Cart' }));
    }

    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({ order: targetOrder, totalPrice: 50000 })
    );
  }),
];
