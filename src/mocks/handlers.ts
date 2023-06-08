import { rest } from 'msw';
import products from './data/products.json';
import cartProducts from './data/cartProducts.json';
import points from './data/point.json';
import orderProducts from './data/orderProducts.json';
import orderDetailsProducts from './data/orderDetailProducts.json';
import { findTargetProduct } from '../domain/cartProductHandler';
import type { OrderedData } from '../types/product';

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
    return res(ctx.delay(200), ctx.status(200), ctx.json(cartProducts));
  }),

  rest.get('/points', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(points));
  }),

  rest.get('/orders', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(orderProducts));
  }),

  rest.get(`/orders/1`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(orderDetailsProducts));
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCartProducts = cartProducts;

    if (findTargetProduct(storedCartProducts, productId)) {
      return res(
        ctx.status(304),
        ctx.json({ message: '이미 상품이 있습니다' })
      );
    }

    const product = products.find((product) => product.productId === productId);

    if (!product)
      return res(ctx.status(404), ctx.json({ message: '상품이 없습니다' }));

    const cartItemId = Date.now();

    const location = `/cart-items/${cartItemId}`;
    return res(
      ctx.status(201),
      ctx.set('Location', location),
      ctx.json({ message: '상품이 추가되었습니다' })
    );
  }),

  rest.post<{ orderData: OrderedData }>('/orders', (req, res, ctx) => {
    if (!req.body)
      return res(ctx.status(404), ctx.json({ message: '상품이 없습니다.' }));

    const orderId = Date.now();

    const location = `/orders/${orderId}`;
    return res(
      ctx.delay(200),
      ctx.status(201),
      ctx.set('Location', location),
      ctx.json({ message: '주문이 완료되었습니다.' })
    );
  }),

  rest.patch<{ quantity: number }>(
    '/cart-items/:cartItemId',
    (req, res, ctx) => {
      const { cartItemId } = req.params;
      const { quantity } = req.body;

      const cartProductId = Number(cartItemId as string);

      const storedCartProducts = cartProducts;

      const targetCartProduct = storedCartProducts.find(
        (cartProduct) => cartProduct.cartItemId === cartProductId
      );

      if (!targetCartProduct) {
        return res(
          ctx.status(304),
          ctx.json({ message: '카트에 상품이 없습니다' })
        );
      }

      targetCartProduct.quantity = quantity;

      return res(
        ctx.delay(200),
        ctx.status(200),
        ctx.json({ message: '업데이트가 완료되었습니다' })
      );
    }
  ),

  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const { id } = req.params;
    const cartItemId = Number(id as string);

    const index = cartProducts.findIndex(
      (product) => product.cartItemId === cartItemId
    );

    if (index === -1) {
      return res(ctx.status(404), ctx.text('찾을 수  없습니다'));
    }

    cartProducts.splice(index, 1);
    return res(ctx.status(204));
  }),
];
