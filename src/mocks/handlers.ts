import { rest } from 'msw';

import initialData from '../data/mockData.json';

interface PostCartItemId {
  itemId: string;
}

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialData));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '치킨',
            imageUrl:
              'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
            price: 15000,
          },
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 3,
            name: '피자',
            imageUrl:
              'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            price: 20000,
          },
        },
      ])
    );
  }),

  rest.get('/coupons', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          couponId: 1,
          couponName: '오늘만 10%할인 쿠폰',
          minAmount: '15000',
          isPublished: false,
        },
        {
          couponId: 2,
          couponName: '사장님이 미쳤어요! 99%할인 쿠폰',
          minAmount: '999999999',
          isPublished: true,
        },
      ])
    );
  }),

  rest.get('/orders', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          id: 11234,
          products: [
            {
              id: 1,
              name: '치킨',
              imageUrl:
                'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
              price: 15000,
              quantity: 1,
            },
            {
              id: 3,
              name: '피자',
              imageUrl:
                'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
              price: 20000,
              quantity: 2,
            },
          ],
        },
        {
          id: 1235422,
          products: [
            {
              id: 1,
              name: '치킨',
              imageUrl:
                'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
              price: 15000,
              quantity: 3,
            },
            {
              id: 2,
              name: '샐러드',
              imageUrl:
                'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
              price: 20000,
              quantity: 2,
            },
          ],
        },
      ])
    );
  }),

  rest.post('/orders', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.delay(500),
      ctx.json({
        id: 1,
        products: [
          {
            id: 1,
            name: '치킨',
            imageUrl: 'image.jpeg',
            price: 15000,
            quantity: 1,
          },
          {
            id: 3,
            name: '피자',
            imageUrl: 'image.jpeg',
            price: 20000,
            quantity: 2,
          },
        ],
        total_amount: 55000,
        delivery_amount: 2000,
        discounted_amount: 3000,
        address: '서울특별시 송파구 ...',
      })
    );
  }),

  rest.get('/coupons/active?total=55000', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          couponId: 1,
          couponName: '오늘만 10%할인 쿠폰',
          minAmount: '15000',
        },
        {
          couponId: 2,
          couponName: '사장님이 미쳤어요! 99%할인 쿠폰',
          minAmount: '9999',
        },
      ])
    );
  }),

  rest.get('/orders/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        id: 1,
        products: [
          {
            id: 1,
            name: '치킨',
            imageUrl:
              'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
            price: 15000,
            quantity: 1,
          },
          {
            id: 3,
            name: '피자',
            imageUrl:
              'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
            price: 20000,
            quantity: 2,
          },
        ],
        totalProductAmount: 55000,
        deliveryAmount: 2000,
        discountedProductAmount: 3000,
        address: '서울특별시 송파구 송파송파송파송파송파송파송파송파송파송파송파송파',
      })
    );
  }),

  rest.get('/coupons/discount/1234?total=30000', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({
        discountedProductAmount: 27000,
        discountAmount: 3000,
      })
    );
  }),

  rest.post('/coupons/:id', (req, res, ctx) => {
    return res(ctx.status(201), ctx.delay(1000));
  }),

  rest.patch<PostCartItemId>('/cart-items/:cartItemId', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500));
  }),

  rest.delete('/cart-item/:id', async (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(500));
  }),

  rest.post('/cart-items', (req, res, ctx) => {
    return res(ctx.status(201), ctx.delay(500));
  }),
];
