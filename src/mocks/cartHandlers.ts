import { rest } from 'msw';
import {
  CART_ITEMS_KEY,
  getCartItemsFromLocalStorage,
  getProductListFromLocalStorage,
} from '../utils/localStorage';

export const cartHandlers = [
  rest.get('/cart-items', (_, res, ctx) => {
    const cartItems = getCartItemsFromLocalStorage();

    return res(ctx.json(cartItems), ctx.status(200), ctx.delay(2000));
  }),
  rest.post('/cart-items', async (req, res, ctx) => {
    const requestData = await req.json();
    const productId = await requestData.productId;
    const randomCartId = Math.random();

    const cartItems = getCartItemsFromLocalStorage();
    const productList = getProductListFromLocalStorage();

    const product = productList.find((p) => p.id === productId);

    if (cartItems.some((cartItem) => cartItem.id === productId))
      return res(ctx.json('이미 있는 상품입니다!'), ctx.status(400));

    if (product === undefined)
      return res(ctx.json('없는 상품입니다!'), ctx.status(400));

    localStorage.setItem(
      CART_ITEMS_KEY,
      JSON.stringify([
        ...cartItems,
        {
          id: randomCartId,
          quantity: 1,
          product,
        },
      ])
    );

    return res(
      ctx.json('success'),
      ctx.status(200),
      ctx.set({ Location: `${randomCartId}` }),
      ctx.delay(1000)
    );
  }),
  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const requestData = await req.json();
    const quantity = await requestData.quantity;
    const productId = Number(req.params.id);

    const cartItems = getCartItemsFromLocalStorage();

    if (!cartItems.some((cartItem) => cartItem.id === productId))
      return res(
        ctx.json('수량을 변경하려는 상품이 존재하지 않습니다!'),
        ctx.status(400)
      );

    localStorage.setItem(
      CART_ITEMS_KEY,
      JSON.stringify(
        cartItems.map((cartItem) => {
          if (cartItem.id === productId) return { ...cartItem, quantity };
          return cartItem;
        })
      )
    );

    return res(ctx.json('success'), ctx.status(200));
  }),
  rest.delete('/cart-items/:id', (req, res, ctx) => {
    const productId = Number(req.params.id);
    const cartItems = getCartItemsFromLocalStorage();

    if (!cartItems.some((cartItem) => cartItem.id === productId))
      return res(
        ctx.json(`삭제하려는 상품이 존재하지 않습니다!`),
        ctx.status(400)
      );

    localStorage.setItem(
      CART_ITEMS_KEY,
      JSON.stringify(cartItems.filter((cartItem) => cartItem.id !== productId))
    );

    return res(ctx.json('success'), ctx.status(200));
  }),
];
