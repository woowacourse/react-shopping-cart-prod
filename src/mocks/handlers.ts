import { rest } from 'msw';
import products from './data/products.json';
import point from './data/point.json';

// import cart from './data/cart.json';
import { findTargetProduct } from '../domain/cartProductHandler';

import type { CartProduct, Order, ScheduledOrder } from '../types/product';
import { getData, updateData } from '../utils/localStorage';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/empty', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json([]));
  }),

  rest.get('/products/error', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(400), ctx.json(products));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(getData('cart')));
  }),

  rest.get('/orders', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(getData('order')));
  }),

  rest.get('/points', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(getData('point')));
  }),

  rest.get('/orders/:orderId', (req, res, ctx) => {
    const storedOrders: Order[] = getData('order');
    const order = storedOrders.find(
      (order) => order.orderId === Number(req.params.orderId)
    );

    if (!order)
      return res(
        ctx.status(404),
        ctx.json({ message: '주문 내역이 없습니다' })
      );

    return res(ctx.delay(200), ctx.status(200), ctx.json(order));
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCart: CartProduct[] = getData('cart');

    if (findTargetProduct(storedCart, productId)) {
      return res(
        ctx.status(304),
        ctx.json({ message: '이미 상품이 있습니다' })
      );
    }

    const product = products.find((product) => product.productId === productId);

    if (!product)
      return res(ctx.status(404), ctx.json({ message: '상품이 없습니다' }));

    return res(ctx.status(201), ctx.json({ message: '상품이 추가되었습니다' }));
  }),

  rest.post<{ order: ScheduledOrder }>('/orders', (req, res, ctx) => {
    const { order } = req.body;
    const { cartItems, totalPrice } = order;
    console.log(order);
    const currentOrders = getData('order');
    const updatedOrders: Order[] = [
      ...currentOrders,
      {
        orderId: Date.now(),
        orderDateTime: '2023-06-01 08:30:21',
        orderItems: cartItems,
        totalPrice,
      },
    ];
    updateData('order', updatedOrders);

    return res(ctx.status(201), ctx.json({ message: '상품이 추가되었습니다' }));
  }),

  rest.patch<{ quantity: number }>(
    '/cart-items/:cartItemId',
    (req, res, ctx) => {
      const { cartItemId } = req.params;

      const cartProductId = Number(cartItemId as string);

      const storedCart: CartProduct[] = getData('cart');

      if (
        !storedCart.find(
          (cartProduct) => cartProduct.cartItemId === cartProductId
        )
      ) {
        return res(
          ctx.status(304),
          ctx.json({ message: '카트에 상품이 없습니다' })
        );
      }

      return res(
        ctx.delay(200),
        ctx.status(200),
        ctx.json({ message: '업데이트가 완료되었습니다' })
      );
    }
  ),

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProductId = Number(cartItemId as string);

    const storedCart = getData('cart');

    if (
      !storedCart.cartItems.find(
        (cartProduct: CartProduct) => cartProduct.cartItemId === cartProductId
      )
    ) {
      return res(
        ctx.status(304),
        ctx.json({ message: '카트에 상품이 없습니다' })
      );
    }

    return res(ctx.delay(200), ctx.status(204));
  }),
];
