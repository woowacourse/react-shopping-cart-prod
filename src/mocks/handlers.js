import { rest } from "msw";
import { productList } from "@/mocks/data";

import { BASE_URL } from "@/constants";

let users = [
  { email: "woowa@gmail.com", password: "password11", nickname: "dory" },
];

// cart db, id와 quantity 저장
let cart = [];

const getDetailCart = () =>
  cart.map((cartItem) => {
    const productDetail = productList.find((item) => item.id === +cartItem.id);

    return { ...productDetail, quantity: cartItem.quantity };
  });

export const handlers = [
  // 상품 리스트 가져오기
  rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json({ productList }));
  }),

  // 상품 상세 정보 가져오기
  rest.get(`${BASE_URL}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const product = productList.find(({ id: productId }) => productId === +id);

    if (!product) return res(ctx.status(400));
    return res(ctx.status(200), ctx.json(product));
  }),

  // 인증 인가 - 회원가입
  rest.post(`${BASE_URL}/users`, (req, res, ctx) => {
    // 이메일이 이미 존재하는 경우
    if (users.find((user) => user.email === req.body.email)) {
      return res(
        ctx.status(400),
        ctx.json({
          errorCode: "1001",
          message: "error message",
        })
      );
    }

    users.push(req.body);
    return res(ctx.status(200));
  }),

  // 인증 인가 - 로그인
  rest.post(`${BASE_URL}/login`, (req, res, ctx) => {
    if (
      users.find(
        (user) =>
          user.email === req.body.email && user.password === req.body.password
      )
    ) {
      return res(
        ctx.status(200),
        ctx.json({
          accessToken: "accessToken",
        })
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        errorCode: "1002",
      })
    );
  }),

  // 인증 인가 - 회원 정보 요청
  rest.get(`${BASE_URL}/users/me`, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization;

    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({ email: "example@gmail.com", nickname: "example" })
    );
  }),

  rest.put(`${BASE_URL}/users/me`, (req, res, ctx) => {
    console.log(req);
    const accessToken = req.headers._headers.authorization;

    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(ctx.status(204));
  }),

  rest.delete(`${BASE_URL}/users/me`, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization;

    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(ctx.status(204));
  }),

  // 장바구니 가져오기
  rest.get(`${BASE_URL}/users/me/carts`, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization;
    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(ctx.status(200), ctx.json({ cartList: getDetailCart() }));
  }),

  // 장바구니에 담기
  rest.post(`${BASE_URL}/users/me/carts`, (req, res, ctx) => {
    console.log(req);
    const { productId } = req.body;
    const accessToken = req.headers._headers.authorization;

    // 인가가 잘못됬을 때
    if (!accessToken) {
      return res(ctx.status(401));
    }

    // 중복된 상품을 담는 경우
    if (cart.some((item) => item.id === productId)) {
      return res(
        ctx.status(400),
        ctx.json({
          errorCode: "1101",
          message: "중복된 물품입니다.",
        })
      );
    }

    cart.push({ id: productId, quantity: 1 });
    return res(ctx.status(204));
  }),

  // 장바구니 물품 삭제
  rest.delete(`${BASE_URL}/users/me/carts/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const deletedCart = cart.filter((item) => item.id !== +id);
    cart = deletedCart;

    return res(ctx.status(204));
  }),

  // 장바구니 수량 변경
  rest.put(`${BASE_URL}/users/me/carts/:id`, (req, res, ctx) => {
    // id로 담겨 있는지 확인하고 없으면 바로 저장, 아니면 수량 추가
    const productId = req.params.id;
    let updatedItem = {};

    const updatedCart = cart.map((item) => {
      if (item.id === +productId) {
        updatedItem = { ...item, quantity: req.body.quantity };
        return updatedItem;
      }
      return item;
    });
    cart = updatedCart;

    return res(ctx.status(200), ctx.json(updatedItem));
  }),
];
