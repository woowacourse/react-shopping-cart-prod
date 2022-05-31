import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_PATH } from '../constants';
import { productList, user } from './data';

let cartList = [];

const handlers = [
  rest.get(SERVER_PATH.PRODUCTS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get(`${SERVER_PATH.PRODUCTS}/:id`, (req, res, ctx) => {
    const id = +req.params.id;
    const product = productList.find(({ id: productId }) => productId === id);
    return res(ctx.status(200), ctx.json(product));
  }),

  rest.get(SERVER_PATH.CART, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post(`${SERVER_PATH.CART}/:id`, (req, res, ctx) => {
    const id = +req.params.id;
    const index = cartList.findIndex(({ id: productId }) => productId === id);
    const product = productList.find(({ id: productId }) => productId === id);

    if (index === -1) {
      cartList.push({ ...product, quantity: 1 });
    }
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.delete(`${SERVER_PATH.CART}/:id`, (req, res, ctx) => {
    const id = +req.params.id;
    cartList = cartList.filter((item) => item.id !== id);
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.put(`${SERVER_PATH.CART}/:id`, (req, res, ctx) => {
    const id = +req.params.id;
    const quantity = +req.body.quantity;
    const cartItemIndex = cartList.findIndex((cartItem) => cartItem.id === id);

    cartList[cartItemIndex].quantity = quantity;
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post(`${SERVER_PATH.SIGN_UP}`, (req, res, ctx) => {
    const { userInfo } = req.body;
    user.push(userInfo);

    return res(ctx.status(200), ctx.json());
  }),

  rest.post(`${SERVER_PATH.LOGIN}`, (req, res, ctx) => {
    const { userInfo } = req.body;

    return res(ctx.status(200), ctx.json({ accessToken: uuidv4() }));
  }),
];

export { handlers };
