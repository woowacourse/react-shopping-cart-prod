import { rest } from 'msw';
import { delay } from './utils';

import mockData from '../assets/productMock.json';

export const getHandlers = [
  rest.get('/products', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(200), ctx.json(mockData));
  }),

  rest.get('/products/:id', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(ctx.delay(delay), ctx.status(200));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    const localCart = localStorage.getItem('cartState');
    const cart = localCart ? JSON.parse(localCart) : [];

    return res(ctx.delay(delay), ctx.status(200), ctx.json(cart));
  }),

  rest.get('/order-policy', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(
      ctx.delay(delay),
      ctx.status(200),
      ctx.json({
        freeShippingThreshold: 30000,
        shippingFee: 3000,
        pointPercentage: 10,
      })
    );
  }),

  rest.get('/orders', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(
      ctx.delay(delay),
      ctx.status(200),
      ctx.json([
        {
          orderId: 1,
          orderDate: '2023-04-05 15:00',
          orderDetails: [
            {
              quantity: 3,
              product: {
                id: 1,
                price: 10000,
                name: '치킨',
                imageUrl: 'http://example.com/chicken.jpg',
              },
            },
          ],
        },
        {
          orderId: 2,
          orderDate: '2023-04-05 15:00',
          orderDetails: [
            {
              quantity: 3,
              product: {
                id: 1,
                price: 10000,
                name: '치킨',
                imageUrl: 'http://example.com/chicken.jpg',
              },
            },
            {
              quantity: 2,
              product: {
                id: 2,
                price: 20000,
                name: '피자',
                imageUrl: 'http://example.com/pizza.jpg',
              },
            },
          ],
        },
      ])
    );
  }),

  rest.get('/orders/:id', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(
      ctx.delay(delay),
      ctx.status(200),
      ctx.json({
        orderId: 2,
        orderDate: '2023-04-05 15:00',
        totalProductsPrice: 70000,
        shippingFee: 0,
        usedPoint: 3000,
        orderDetails: [
          {
            quantity: 3,
            product: {
              id: 1,
              price: 10000,
              name: '치킨',
              imageUrl: 'http://example.com/chicken.jpg',
            },
          },
          {
            quantity: 2,
            product: {
              id: 2,
              price: 20000,
              name: '피자',
              imageUrl: 'http://example.com/pizza.jpg',
            },
          },
        ],
      })
    );
  }),

  rest.get('/point', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');
    if (errorCode) {
      return res(ctx.delay(delay), ctx.status(Number(errorCode)));
    }

    return res(
      ctx.delay(delay),
      ctx.status(200),
      ctx.json({
        usablePoint: 1_000,
      })
    );
  }),
];
