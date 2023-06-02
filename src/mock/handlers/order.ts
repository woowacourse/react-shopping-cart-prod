import { rest } from 'msw';
import { SERVER, ORDER_URL } from '../../constants/url';

const orders = [
  {
    orderId: 1,
    products: [
      {
        id: 1,
        name: 'foo',
        imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300',
        quantity: 4,
        totalPrice: 40000,
      },
      {
        id: 2,
        name: 'bar',
        imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
        quantity: 3,
        totalPrice: 30000,
      },
    ],
  },
  {
    orderId: 2,
    products: [
      {
        id: 2,
        name: 'bar',
        imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/ac90cb6d-70ad-4271-a25e-03e4db9a9960.jpg?h=300&w=300',
        quantity: 3,
        totalPrice: 30000,
      },
    ],
  },
];

export const orderHandlers = [
  // 주문 목록 조회
  rest.get(`${SERVER.MSW}${ORDER_URL}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(orders));
  }),

  // 주문 상세 정보 조회
  rest.get(`${SERVER.MSW}${ORDER_URL}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const order = orders.find(({ orderId }) => orderId === Number(id));

    return res(ctx.status(201), ctx.json(order));
  }),
];
