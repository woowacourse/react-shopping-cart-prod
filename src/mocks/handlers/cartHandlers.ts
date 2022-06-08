import axios from 'configs/api';
import db from 'db.json';
import { rest } from 'msw';
import { User, Cart } from 'types/index';

import PATH from 'constants/path';

const { baseURL } = axios.defaults;
const KEY = 'mockUserList';

type MockUser = User & { accessToken: string };

const cartHandlers = [
  // 장바구니 조회하기
  rest.get(`${baseURL}${PATH.REQUEST_CART}`, (req, res, ctx) => {
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    const mockUserList: Array<MockUser> = JSON.parse(
      localStorage.getItem(KEY) || '[]'
    );

    const targetUser = mockUserList.find(
      user => user.accessToken === accessToken
    );

    if (!targetUser) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          quantity: 10,
          product: {
            id: 1,
            name: '짱구 토끼 인형',
            price: 9900,
            imageUrl:
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_2928088%2F29280886621.20211018102157.jpg&type=sc960_832',
            description:
              '귀여운 짱구가 토끼 옷을 입고 당근을 안고 있는 인형입니다.',
          },
        },
        {
          id: 2,
          quantity: 5,
          product: {
            id: 2,
            name: '짱구 토토로 인형',
            price: 9900,
            imageUrl:
              'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20211019_84%2F1634650964526pUU9N_JPEG%2FO1CN01UK8OK11DH3ujVvaGG_190-0-lubanu.jpg_1200x1200.jpg&type=sc960_832',
            description: '35cm / 45cm / 56cm / 75cm / 100cm 짱구 인형입니다.',
          },
        },
      ])
    );
  }),

  // 장바구니 추가
  rest.post(
    `${baseURL}${PATH.REQUEST_CART}`,
    (
      req: {
        headers: Headers;
        body: { productId: Cart['id']; quantity: Cart['quantity'] };
      },
      res,
      ctx
    ) => {
      const accessToken = req.headers.get('authorization')?.split(' ')[1];

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      );

      const targetUser = mockUserList.find(
        user => user.accessToken === accessToken
      );

      if (!targetUser) {
        return res(ctx.status(401));
      }

      const { productId, quantity } = req.body;

      if (quantity < 0) {
        return res(ctx.status(400));
      }

      if (
        !db.products.find(productInfo => String(productInfo.id) === productId)
      ) {
        return res(ctx.status(404));
      }

      return res(ctx.status(201));
    }
  ),

  // 장바구니 삭제
  rest.delete(`${baseURL}${PATH.REQUEST_CART}/:cartItemId`, (req, res, ctx) => {
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    const mockUserList: Array<MockUser> = JSON.parse(
      localStorage.getItem(KEY) || '[]'
    );

    const targetUser = mockUserList.find(
      user => user.accessToken === accessToken
    );

    if (!targetUser) {
      return res(ctx.status(401));
    }

    if (!req.params.cartItemId) {
      return res(ctx.status(404));
    }

    return res(ctx.status(204));
  }),

  // 장바구니 수량 수정
  rest.patch(
    `${baseURL}${PATH.REQUEST_CART}/:cartItemId`,
    (
      req: {
        headers: Headers;
        params: { cartItemId: string };
        body: { quantity: Cart['quantity'] };
      },
      res,
      ctx
    ) => {
      const accessToken = req.headers.get('authorization')?.split(' ')[1];

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      );

      const targetUser = mockUserList.find(
        user => user.accessToken === accessToken
      );

      if (!targetUser) {
        return res(ctx.status(401));
      }

      if (!req.params.cartItemId) {
        return res(ctx.status(404));
      }

      if (req.body.quantity < 0) {
        return res(ctx.status(400));
      }

      return res(ctx.status(204));
    }
  ),
];

export default cartHandlers;
