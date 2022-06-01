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

export const userHandler = [
  rest.get(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/:customerId`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          email: "test@naver.com",
          username: "test",
        })
      );
    }
  ),
  rest.post(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}`,
    (req, res, ctx) => {
      return res(ctx.status(201));
    }
  ),
  rest.post(`${BASE_SERVER_URL}${SERVER_PATH.LOGIN}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: "ddfsdfadsfdsafsad",
        customer: {
          id: 1,
          email: "test@naver.com",
          username: "test",
        },
      })
    );
  }),
  rest.post(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/:customerId`,
    (req, res, ctx) => {
      return res(ctx.status(204));
    }
  ),
  rest.put(
    `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/:customerId`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          email: "test@naver.com",
          username: "test222",
        })
      );
    }
  ),
];
