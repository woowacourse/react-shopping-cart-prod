import { rest } from "msw";
import { productList } from "@/mocks/data";

let users = [
  { email: "woowa@gmail.com", password: "password11", nickname: "dory" },
];

export const handlers = [
  // 상품 리스트 가져오기
  rest.get(`/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(JSON.stringify(productList)));
  }),

  // 상품 상세 정보 가져오기
  rest.get(`/products/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const product = productList.find(({ id: productId }) => productId === id);

    if (!product) return res(ctx.status(400));
    return res(ctx.status(200), ctx.json(JSON.stringify(product)));
  }),

  // 인증 인가 - 회원가입
  rest.post(`/users`, (req, res, ctx) => {
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
  rest.post(`/login`, (req, res, ctx) => {
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
  rest.get(`/users/me`, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization;

    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({ email: "example@gmail.com", nickname: "example" })
    );
  }),

  rest.put(`/users/me`, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization;

    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(ctx.status(204));
  }),

  rest.delete(`/users/me`, (req, res, ctx) => {
    const accessToken = req.headers._headers.authorization;

    if (!accessToken) {
      return res(ctx.status(401));
    }

    return res(ctx.status(204));
  }),
];
