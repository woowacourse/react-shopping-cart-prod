import { rest } from "msw";

import db from "./db.json";
import { BASE_SERVER_URL, SERVER_PATH } from "../constants";

export const prouctsHandler = [
  rest.get(`${BASE_SERVER_URL}${SERVER_PATH.PRODUCT_LIST}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.products));
  }),
  rest.get(
    `${BASE_SERVER_URL}${SERVER_PATH.PRODUCT_LIST}/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      const productList = db.products;
      const selectedProduct = productList.find(
        (product) => product.id === Number(id)
      );

      if (!selectedProduct) return res(ctx.status(404), ctx.json({}));
      return res(ctx.status(200), ctx.json(selectedProduct));
    }
  ),
];

export const cartsHandler = [
  rest.get(`${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`, (req, res, ctx) => {
    const cartList = db.carts;
    const productList = db.products;

    const result = cartList.map(({ id, count }) => {
      const selectedProduct = productList.find((product) => product.id === id);
      return { ...selectedProduct, count };
    });

    return res(ctx.status(200), ctx.json(result));
  }),
  rest.post(`${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`, (req, res, ctx) => {
    const { id, count } = req.body;
    if (!id || !count) return res(ctx.status(400));

    const cartList = db.carts;
    if (cartList.some((cart) => cart.id === id)) {
      return res(ctx.status(200), ctx.json({ isAlreadyExists: true }));
    }

    db.carts = [...cartList, { id, count }];
    return res(ctx.status(200), ctx.json({ isAlreadyExists: false }));
  }),
  rest.delete(`${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`, (req, res, ctx) => {
    const id = req.url.searchParams.get("productId");
    const cartList = db.carts;
    const selectedCartList = cartList.filter(
      (cartItem) => cartItem.id !== Number(id)
    );

    db.carts = selectedCartList;
    return res(ctx.status(200));
  }),
  rest.patch(`${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`, (req, res, ctx) => {
    const id = req.url.searchParams.get("productId");

    const { count } = req.body;
    const cartList = db.carts;
    const cartItemIndex = cartList.findIndex(
      (cartItem) => cartItem.id === Number(id)
    );

    if (cartItemIndex < 0) return res(ctx.status(404));

    db.carts[cartItemIndex].count = count;
    return res(ctx.status(200));
  }),
];

let users = [];
export const userHandler = [
  rest.get(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/:customerId`,
    (req, res, ctx) => {
      const { customerId } = req.params;
      const selectedUser = users.find((user) => user.id === Number(customerId));
      if (!selectedUser)
        return res(
          ctx.status(404),
          ctx.json({ message: "존재하지 않는 회원입니다." })
        );

      return res(ctx.status(200), ctx.json(selectedUser));
    }
  ),
  rest.post(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}`,
    (req, res, ctx) => {
      const { email, username, password } = req.body;
      if (!email)
        return res(
          ctx.status(400),
          ctx.json({ field: "email", message: "이메일이 존재하지 않습니다." })
        );
      if (!username)
        return res(
          ctx.status(400),
          ctx.json({
            field: "username",
            message: "닉네임이 존재하지 않습니다.",
          })
        );
      if (!password)
        return res(
          ctx.status(400),
          ctx.json({
            field: "password",
            message: "비밀번호가 존재하지 않습니다.",
          })
        );

      if (users.some((user) => user.email === email))
        return res(
          ctx.status(400),
          ctx.json({
            field: "email",
            message: "이미 가입한 이메일입니다. ",
          })
        );

      users = [
        ...users,
        { id: Math.floor(Math.random() * 10000), email, username, password },
      ];
      return res(ctx.status(201));
    }
  ),
  rest.post(`${BASE_SERVER_URL}${SERVER_PATH.LOGIN}`, (req, res, ctx) => {
    const { email: emailInfo, password } = req.body;
    if (!emailInfo || !password)
      return res(
        ctx.status(404),
        ctx.json({ message: "유효하지 않은 입력입니다." })
      );

    const selectedUser = users.find((user) => user.email === emailInfo);
    if (!selectedUser)
      return res(
        ctx.status(404),
        ctx.json({ message: "이메일 또는 비밀번호가 틀렸습니다." })
      );
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: "ddfsdfadsfdsafsad",
        customer: {
          id: selectedUser.id,
          email: selectedUser.email,
          username: selectedUser.username,
        },
      })
    );
  }),
  rest.post(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/:customerId`,
    (req, res, ctx) => {
      const { customerId } = req.params;
      const { password } = req.body;
      if (users.some((user) => user.password === password)) {
        users = users.filter((user) => user.id !== Number(customerId));
        return res(ctx.status(204));
      }
      return res(
        ctx.status(400),
        ctx.json({ message: "비밀번호가 틀렸습니다." })
      );
    }
  ),
  rest.put(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/:customerId`,
    (req, res, ctx) => {
      const { customerId } = req.params;
      const { username } = req.body;

      if (!username)
        return res(
          ctx.status(400),
          ctx.json({ message: "수정에 실패했습니다." })
        );

      const selectedUser = users.find((user) => user.id === Number(customerId));
      selectedUser.username = username;

      return res(
        ctx.status(200),
        ctx.json({
          id: Number(customerId),
          email: selectedUser.email,
          username: selectedUser.username,
        })
      );
    }
  ),
];
