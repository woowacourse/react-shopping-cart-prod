import { rest } from 'msw';

import products from './data/products.json';
import coupons from './data/coupons.json';

import { CART_STORAGE_ID } from '../constants/storage';

import {
  addTargetProduct,
  deleteTargetProduct,
  findTargetProduct,
  updateTargetQuantity,
} from '../states/cartProducts/util';
import type { CartProduct } from '../types/product';
import { Order, OrderDetail } from '../types/order';

const orders: Order[] = [];
const orderDetails: OrderDetail[] = [];

export const handlers = [
  rest.get('/products', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.json(products)
    );
  }),

  rest.get('/products/empty', (_, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get('/products/error', (_, res, ctx) => {
    return res(ctx.status(400));
  }),

  rest.get('/products/network-error', (_, res, ctx) => {
    return res(ctx.status(500));
  }),

  rest.get('/cart-items', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.json(JSON.parse(localStorage.getItem(CART_STORAGE_ID) ?? '[]'))
    );
  }),

  rest.get('/coupons', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(coupons));
  }),

  rest.get('/orders', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(orders));
  }),

  rest.get('/orders/:orderId', (req, res, ctx) => {
    const { orderId } = req.params;
    const orderDetail = orderDetails.find(
      orderDetail => orderDetail.order.orderId === Number(orderId)
    );

    if (!orderDetail) return res(ctx.status(400));

    return res(ctx.status(200), ctx.json(orderDetail));
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCartProducts: CartProduct[] = JSON.parse(
      localStorage.getItem(CART_STORAGE_ID) ?? '[]'
    );

    if (findTargetProduct(storedCartProducts, productId)) {
      return res(ctx.status(304));
    }

    const product = products.find(product => product.id === productId);

    if (!product) {
      return res(ctx.status(400));
    }

    localStorage.setItem(
      CART_STORAGE_ID,
      JSON.stringify(addTargetProduct(storedCartProducts, product.id, product))
    );

    return res(ctx.status(201), ctx.set('location', `/${product.id}`));
  }),

  rest.post<{
    cartItemIds: number[];
    totalPrice: number;
    couponId: number;
  }>('/orders', (req, res, ctx) => {
    const reqOrder = req.body;

    if (!Object.keys(reqOrder).every(key => key in reqOrder)) {
      return res(ctx.status(400));
    }

    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_ID) ?? '[]');
    const orderItems = reqOrder.cartItemIds.map(cartItemId => {
      return cartItems.find(
        (cartItem: CartProduct) => cartItem.id === cartItemId
      );
    });

    const order = {
      orderId: orders.length + 1,
      orderItems: orderItems,
    };
    orders.push(order);

    const orderDetail = {
      order: order,
      totalPrice: reqOrder.totalPrice,
    };
    orderDetails.push(orderDetail);

    return res(ctx.status(200));
  }),

  rest.patch<{ quantity: number }>(
    '/cart-items/:cartItemId',
    (req, res, ctx) => {
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      const cartProductId = Number(cartItemId as string);

      const storedCartProducts: CartProduct[] = JSON.parse(
        localStorage.getItem(CART_STORAGE_ID) ?? '[]'
      );

      if (!findTargetProduct(storedCartProducts, cartProductId)) {
        return res(ctx.status(304));
      }

      localStorage.setItem(
        CART_STORAGE_ID,
        JSON.stringify(
          updateTargetQuantity(storedCartProducts, cartProductId, quantity)
        )
      );

      return res(ctx.status(200));
    }
  ),

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProductId = Number(cartItemId as string);

    const storedCartProducts: CartProduct[] = JSON.parse(
      localStorage.getItem(CART_STORAGE_ID) ?? '[]'
    );

    if (!findTargetProduct(storedCartProducts, cartProductId)) {
      return res(ctx.status(304));
    }

    localStorage.setItem(
      CART_STORAGE_ID,
      JSON.stringify(deleteTargetProduct(storedCartProducts, cartProductId))
    );

    return res(ctx.status(204));
  }),
];
