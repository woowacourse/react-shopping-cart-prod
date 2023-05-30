import { rest } from 'msw';
import { Cart } from 'types';
import { getLocalStorageData, setLocalStorageData } from 'utils/storage';
import productList from './productList.json';
import payment from './payment.json';
import orderList from './orderList.json';

const cartListStorage = getLocalStorageData<Cart[]>('cartList');
const cartData = { cartList: [...cartListStorage] };

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(productList));
  }),

  rest.get('/api/cart-items', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(cartData));
  }),

  rest.post('/api/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();
    const productItem = productList.choonsik.find(
      (product) => product.id === productId
    );
    if (!productItem) return;

    const cartItem = { id: productId, product: productItem, quantity: 1 };
    cartData.cartList = [...cartData.cartList, cartItem];

    setLocalStorageData<Cart[]>(
      'cartList',
      cartData.cartList.filter((cartItem) => cartItem.quantity !== 0)
    );

    return res(ctx.status(201));
  }),

  rest.patch('/api/cart-items/:cartId', async (req, res, ctx) => {
    const cartId = Number(req.params.cartId);
    const { quantity } = await req.json();

    cartData.cartList = cartData.cartList
      .map((cartItem) => {
        if (cartItem.id === cartId) {
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity !== 0);

    setLocalStorageData<Cart[]>('cartList', cartData.cartList);

    return res(ctx.status(200));
  }),

  rest.delete('/api/cart-items/:cartId', async (req, res, ctx) => {
    const cartId = Number(req.params.cartId);

    cartData.cartList = cartData.cartList.filter(
      (cartItem) => cartItem.id !== cartId
    );
    setLocalStorageData<Cart[]>('cartList', cartData.cartList);

    return res(ctx.status(204));
  }),

  rest.get('/api/payments', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(payment));
  }),

  rest.get('/api/orders', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),

  rest.get('/api/orders/:orderId', (req, res, ctx) => {
    const orderId = Number(req.params.orderId);
    const order = orderList.orders.find((item) => item.orderId === orderId);
    return res(ctx.status(200), ctx.json(order));
  }),
];
