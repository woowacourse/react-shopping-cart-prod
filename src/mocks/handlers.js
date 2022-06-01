import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_PATH } from '../constants';
import { productList } from './data';

let userList = [];
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

  rest.post(`${SERVER_PATH.USER}`, (req, res, ctx) => {
    const { userInfo } = req.body;
    userList.push({ ...userInfo, id: uuidv4() });
    console.log(userList);

    return res(ctx.status(200), ctx.json());
  }),

  rest.post(`${SERVER_PATH.LOGIN}`, (req, res, ctx) => {
    const { loginInfo } = req.body;
    const isSignedUpUser = userList.find(
      (user) => user.email === loginInfo.email && user.password === loginInfo.password
    );
    if (isSignedUpUser) {
      return res(ctx.status(200), ctx.json({ accessToken: isSignedUpUser.id }));
    }
    return res(ctx.status(404), ctx.json());
  }),

  rest.delete(`${SERVER_PATH.USER}`, (req, res, ctx) => {
    const { accessToken } = req.body;
    const userInfoIndex = userList.findIndex((user) => user.id === accessToken);
    userList.splice(userInfoIndex, 1);
    return res(ctx.status(200), ctx.json());
  }),
];

export { handlers, userList };
