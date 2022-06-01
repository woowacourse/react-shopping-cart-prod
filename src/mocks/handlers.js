import { rest } from "msw";
import { productList } from "@/mocks/data";

import { BASE_URL } from "@/constants";

let users = [
  { email: "woowa@gmail.com", password: "password", nickname: "dory" },
];

export const handlers = [
  rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(JSON.stringify(productList)));
  }),

  // 인증 인가
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
];
