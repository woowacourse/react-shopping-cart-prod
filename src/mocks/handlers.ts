import { rest } from 'msw';

import initialData from '../data/mockData.json';
import initialOrderData from '../data/mockOrderData.json';
import initialOrderDetailData from '../data/mockOrderDetail.json';
import initialUsableCouponData from '../data/mockUsableCoupon.json';
import initialCouponData from '../data/mockUserCoupon.json';
import { CartItemType } from '../types';
import { ProductItemType } from './../types/index';

const products: ProductItemType[] = initialData;

export let carts: CartItemType[] = [];

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(products));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(carts));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    return res(ctx.status(201), ctx.delay(1500));
  }),

  rest.delete('/cart-items', (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(1500));
  }),

  rest.get('/coupons', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialCouponData));
  }),

  rest.post('/coupons/:couponId', (req, res, ctx) => {
    return res(ctx.status(201), ctx.delay(1500));
  }),

  rest.get('/coupons/active', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialUsableCouponData));
  }),

  rest.get('/coupons/discount/:id', (req, res, ctx) => {
    const total = req.url.searchParams.get('total');

    return res(
      ctx.status(200),
      ctx.delay(1500),
      ctx.json({
        discountedProductAmount: Number(total) - 3000,
        discountAmount: 3000,
      })
    );
  }),

  rest.get('/orders', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialOrderData));
  }),

  rest.get('/orders/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialOrderDetailData));
  }),

  rest.post('/orders/:id', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.delay(1500),
      ctx.json({
        id: 1,
        products: [
          {
            id: 1,
            name: '콜라',
            imgUrl:
              'https://cdn-mart.baemin.com/sellergoods/main/7dd36483-5b68-43f7-8068-ad2d0e59c15d.jpg?h=300&w=300',
            price: 15000,
            quantity: 1,
          },
          {
            id: 3,
            name: '피자',
            imgUrl:
              'https://cdn-mart.baemin.com/sellergoods/main/7dd36483-5b68-43f7-8068-ad2d0e59c15d.jpg?h=300&w=300',
            price: 20000,
            quantity: 2,
          },
        ],
        totalProductAmount: 55000,
        deliveryAmount: 2000,
        discountedProductAmount: 3000,
        address: '서울특별시 송파구 ...',
      })
    );
  }),
];
