import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_PATH } from '../constants';
import { productList } from './data';

let userList = [];
let cartList = [];
let mockAccessToken = null;

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

  rest.patch(`${SERVER_PATH.CART}/:id`, (req, res, ctx) => {
    const id = +req.params.id;
    const quantity = +req.body.quantity;
    const cartItemIndex = cartList.findIndex((cartItem) => cartItem.id === id);

    cartList[cartItemIndex].quantity = quantity;
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post(SERVER_PATH.USER, (req, res, ctx) => {
    const userInfo = req.body;
    userList.push({ ...userInfo, id: uuidv4() });
    return res(ctx.status(200), ctx.json());
  }),

  rest.post(SERVER_PATH.LOGIN, (req, res, ctx) => {
    const loginInfo = req.body;
    const isSignedUpUser = userList.find(
      (user) => user.email === loginInfo.email && user.password === loginInfo.password
    );
    if (isSignedUpUser) {
      mockAccessToken = isSignedUpUser.id;
      return res(ctx.status(200), ctx.json({ accessToken: isSignedUpUser.id }));
    }
    return res(
      ctx.status(404),
      ctx.json({
        message: '아이디나 비밀번호가 잘못되었습니다.',
      })
    );
  }),

  rest.delete(SERVER_PATH.USER, (req, res, ctx) => {
    const { accessToken } = req.body;
    const userInfoIndex = userList.findIndex((user) => user.id === accessToken);
    mockAccessToken = null;
    userList.splice(userInfoIndex, 1);
    return res(ctx.status(200), ctx.json());
  }),

  rest.patch(SERVER_PATH.PASSWORD, (req, res, ctx) => {
    const { prevPassword, newPassword } = req.body;
    const userInfoIndex = userList.findIndex((user) => user.id === mockAccessToken);

    if (prevPassword !== userList[userInfoIndex].password) {
      return res(
        ctx.status(400),
        ctx.json({
          message: '현재 비밀번호가 틀렸습니다.',
        })
      );
    }

    userList[userInfoIndex].password = newPassword;
    mockAccessToken = null;
    return res(ctx.status(200), ctx.json());
  }),

  rest.patch(SERVER_PATH.USER, (req, res, ctx) => {
    const { nickname } = req.body;
    const userInfoIndex = userList.findIndex((user) => user.id === mockAccessToken);
    userList[userInfoIndex].nickname = nickname;

    return res(ctx.status(200), ctx.json());
  }),

  rest.get(SERVER_PATH.ME, (req, res, ctx) => {
    const isLoggedInUser = userList.find((user) => user.id === mockAccessToken);
    return res(ctx.status(200), ctx.json(isLoggedInUser));
  }),
];

export { handlers, userList };
