import { rest } from 'msw';
import { Cart } from 'types';
import productList from './productList.json';
import coupons from './coupons.json';
import orderList from './orderList.json';
import couponAppliedPrice from './couponAppliedPrice.json';

let cartData: Cart[] = [];

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(productList));
  }),

  rest.get('/api/cart-items', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(cartData));
  }),

  rest.post('/api/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();
    const productItem = productList.find((product) => product.id === productId);
    if (!productItem) return;

    const cartItem = { id: productId, product: productItem, quantity: 1 };
    cartData.push(cartItem);

    return res(ctx.status(201));
  }),

  rest.patch('/api/cart-items/:cartId', async (req, res, ctx) => {
    const cartId = Number(req.params.cartId);
    const { quantity } = await req.json();

    cartData = cartData
      .map((cartItem) => {
        if (cartItem.id === cartId) {
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity !== 0);

    return res(ctx.status(200));
  }),

  rest.delete('/api/cart-items/:cartId', async (req, res, ctx) => {
    const cartId = Number(req.params.cartId);

    cartData = cartData.filter((cartItem) => cartItem.id !== cartId);

    return res(ctx.status(204));
  }),

  rest.get('/api/coupons', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(coupons));
  }),

  rest.get('/api/delivery-policy', (req, res, ctx) => {
    const deliveryPolicy = {
      price: 3000,
      limit: 30000,
    };
    return res(ctx.status(200), ctx.json(deliveryPolicy));
  }),

  rest.get('/cart-items/coupon?id=1,2,3', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(couponAppliedPrice));
  }),

  rest.post('/payments', async (req, res, ctx) => {
    const payments = {
      cartItemIds: [2, 5, 6],
      isDeliveryFree: true,
      totalPaymentPrice: 50000,
      couponIds: [1, 2, 3],
    };
    return res(ctx.status(201), ctx.json(payments));
  }),

  rest.get('/api/orders', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),

  rest.get('/api/orders/:orderId', (req, res, ctx) => {
    const orderId = Number(req.params.orderId);
    const order = orderList.find((item) => item.id === orderId);
    return res(ctx.status(200), ctx.json(order));
  }),
];
