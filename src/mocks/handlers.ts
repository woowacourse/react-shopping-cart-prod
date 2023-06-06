import type { ProductType, CartType, CouponType, OrderType, OrderDetailType } from '../types';

import { rest } from 'msw';

import { MOCK_URL } from '../constants';
import mockProducts from './mockProducts.json';
import mockCoupons from './mockCoupons.json';
import mockOrders from './mockOrders.json';
import mockOrder from './mockOrder.json';

const products: ProductType[] = mockProducts;

const coupons: CouponType[] = mockCoupons;

const orders: OrderType[] = mockOrders;

const order: OrderDetailType = mockOrder;

const getProduct = (productId: number) => {
  return products.find((product) => product.id === productId) as ProductType;
};

const getCart = (): CartType => {
  return JSON.parse(localStorage.getItem('cart') ?? '[]');
};

const setCart = (cart: CartType) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const handleProducts = [
  rest.get(`${MOCK_URL}/products`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(products));
  }),
];

const handleUsers = [
  rest.post(`${MOCK_URL}/users/login`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json({ token: 'YUBhLmNvbToxMjM0' }));
  }),

  rest.post(`${MOCK_URL}/users/join`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200));
  }),

  rest.get(`${MOCK_URL}/users/me/coupons`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(coupons));
  }),
];

const handleCart = [
  rest.get(`${MOCK_URL}/cart-items`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(getCart()));
  }),

  rest.post(`${MOCK_URL}/cart-items`, async (req, res, ctx) => {
    const { productId } = await req.json();
    const product = getProduct(productId);

    setCart(getCart().concat([{ id: Date.now(), quantity: 1, product }]));

    return res(ctx.delay(200), ctx.status(201));
  }),

  rest.patch(`${MOCK_URL}/cart-items/:cartItemId`, async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);
    const { quantity } = await req.json();

    const newCart = getCart().map((cartItem) =>
      cartItem.id === cartItemId ? { ...cartItem, quantity } : cartItem
    );

    setCart(newCart);

    return res(ctx.delay(200), ctx.status(200));
  }),

  rest.delete(`${MOCK_URL}/cart-items/:cartItemId`, (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);
    setCart(getCart().filter(({ id }) => id !== cartItemId));

    return res(ctx.delay(200), ctx.status(204));
  }),
];

const handleOrders = [
  rest.get(`${MOCK_URL}/orders`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(orders));
  }),

  rest.get(`${MOCK_URL}/orders/:orderId`, (req, res, ctx) => {
    const orderId = Number(req.params.orderId);

    return res(ctx.delay(200), ctx.status(200), ctx.json(order));
  }),

  rest.post(`${MOCK_URL}/orders`, (_req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200));
  }),
];

export default [...handleProducts, ...handleUsers, ...handleCart, ...handleOrders];
