import { rest } from 'msw';
import { DELIVERY_FEE } from '../../constants';
import { SERVER, ORDER_URL } from '../../constants/url';
import orders from '../orders.json';

export const orderHandlers = [
  // 주문 목록 조회
  rest.get(`${SERVER.MSW}${ORDER_URL}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(orders));
  }),

  // 주문 상세 정보 조회
  rest.get(`${SERVER.MSW}${ORDER_URL}/:id`, async (req, res, ctx) => {
    const COUPON_DISCOUNT = 5000;

    const { id } = req.params;
    const order = orders.find(({ orderId }) => orderId === Number(id))!;
    const orderDetail = {
      ...order,
      totalPrice: order.totalPayments - DELIVERY_FEE + COUPON_DISCOUNT,
      deliveryFee: DELIVERY_FEE,
      coupon: { id: 1, name: '여름 맞이 할인', priceDiscount: COUPON_DISCOUNT },
    };

    return res(ctx.status(200), ctx.json(orderDetail));
  }),

  // 주문 하기
  rest.post(`${SERVER.MSW}${ORDER_URL}`, async (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];
