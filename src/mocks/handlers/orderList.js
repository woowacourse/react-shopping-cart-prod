import { ORDERS_API_URL } from '@/api/constants';
import { generateNonDuplicatedId } from '@/utils';
import { rest } from 'msw';
import { cartList } from '../data/cart';
import { orderList } from '../data/order';

export const orderListHandlers = [
  rest.post(ORDERS_API_URL.TO_ORDERS, (req, res, ctx) => {
    const cartItemIdList = req.body;

    const orderIdList = cartItemIdList.map(cartItem => cartItem.cartItemId);
    const newCartList = [...cartList.current];
    const orderDetailList = [];

    orderIdList.forEach(id => {
      newCartList.forEach((cart, index) => {
        if (id === cart.id) {
          const orderItem = newCartList.splice(index, 1)[0];
          orderDetailList.push(orderItem);
        }
      });
    });

    cartList.current = newCartList;

    const orderId = generateNonDuplicatedId();

    orderList.current = {
      orders: [
        {
          id: orderId,
          orderDetails: orderDetailList,
        },
      ],
    };

    return res(res => {
      res.status = 201;
      res.headers.set('location', `api/kkojji/${orderId}`);

      return res;
    });
  }),

  rest.get(ORDERS_API_URL.TO_ORDERS_DETAIL, (req, res, ctx) => {
    const {
      params: { id },
    } = req;

    const targetOrder = orderList.current.orders.find(order => order.id === Number(id));

    return res(
      ctx.status(200),
      ctx.json({
        order: targetOrder,
      }),
    );
  }),

  rest.get(ORDERS_API_URL.TO_ORDERS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList.current));
  }),
];
