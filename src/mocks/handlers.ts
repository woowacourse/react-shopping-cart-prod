import { rest } from 'msw';
import productList from './productList.json';
import orderList from './orderedList.json';
import orderDetail from './orderDetail.json';
import coupons from './coupons.json';
import deliveryPolicy from './deliveryPolicy.json';
import resultPrice from './resultPrice.json';
import resultPrice2 from './resultPrice2.json';
import resultPrice3 from './resultPrice3.json';
import resultPrice4 from './resultPrice4.json';
import cartItems from './cartItems.json';

export const handlers = [
  rest.get('api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get('api/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartItems));
  }),

  rest.get('api/coupons', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(coupons));
  }),

  rest.get('api/delivery-policy', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(deliveryPolicy));
  }),

  rest.get('api/orders', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),

  rest.get('api/orders/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderDetail));
  }),

  rest.get('api/cart-items/coupon/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resultPrice));
  }),

  rest.get('api/cart-items/coupon/2', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resultPrice4));
  }),

  rest.get('api/cart-items/coupon/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resultPrice2));
  }),

  rest.get('api/cart-items/coupon/1,2', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resultPrice3));
  }),

  rest.get('api/cart-items/coupon/2,1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resultPrice3));
  }),
];
