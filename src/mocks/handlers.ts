import { LOCAL_BASE_URL } from 'apis';
import { rest } from 'msw';
import { mockItemList } from './mockDB';
import { CartItem, EditPasswordInfo, SignInInfo, SignUpInfo, UserInfo } from 'types/domain';
import { generateRandomCode } from 'utils';

let mockCartList: CartItem[] = [];
let mockUserList: UserInfo[] = [];

export const handlers = [
  rest.get(`${LOCAL_BASE_URL}/itemList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockItemList));
  }),

  rest.get(`${LOCAL_BASE_URL}/itemList/:id`, (req, res, ctx) => {
    const itemId = Number(req.params.id);
    const targetItem = mockItemList.filter(item => item.id === itemId)[0];

    return res(ctx.status(200), ctx.json(targetItem));
  }),

  rest.get(`${LOCAL_BASE_URL}/cartList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCartList));
  }),

  rest.post(`${LOCAL_BASE_URL}/cartList`, (req, res, ctx) => {
    const cartItem: CartItem = Object(req.body);
    const isPutReq = mockCartList.some(item => item.id === cartItem.id);

    if (isPutReq) {
      const newCartList = mockCartList.map(item => {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      mockCartList = [...newCartList];
    }

    if (!isPutReq) {
      mockCartList.push(cartItem);
    }

    return res(ctx.status(200));
  }),

  rest.delete(`${LOCAL_BASE_URL}/cartList/:id`, (req, res, ctx) => {
    const deleteId = Number(req.params.id);

    const newCartList = mockCartList.filter(item => item.id !== deleteId);

    mockCartList = [...newCartList];

    return res(ctx.status(200));
  }),

  rest.put<CartItem>(`${LOCAL_BASE_URL}/cartList/:id`, (req, res, ctx) => {
    const cartItem: CartItem = req.body;

    const newCartList = mockCartList.map(item => {
      if (item.id === cartItem.id) {
        return { ...cartItem };
      }

      return item;
    });

    mockCartList = [...newCartList];

    return res(ctx.status(200), ctx.json(cartItem));
  }),

  //user
  rest.post<SignUpInfo>(`${LOCAL_BASE_URL}/users`, (req, res, ctx) => {
    const signUpInfo: SignUpInfo = req.body;

    mockUserList = [...mockUserList, signUpInfo];

    return res(ctx.status(200), ctx.json({ email: signUpInfo.email, name: signUpInfo.name }));
  }),

  rest.post<SignInInfo>(`${LOCAL_BASE_URL}/login`, (req, res, ctx) => {
    const signInInfo: SignInInfo = req.body;

    const userInfo: UserInfo = mockUserList.find(
      user => user.email === signInInfo.email && user.password === signInInfo.password
    );
    const tokenCode = `Bearer ${generateRandomCode(4)}`;

    if (!userInfo) {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: '에러임',
        })
      );
    }

    mockUserList.forEach(user => {
      if (user.email === signInInfo.email) {
        user.token = tokenCode;
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        email: userInfo.email,
        name: userInfo.name,
        token: tokenCode,
      })
    );
  }),

  rest.patch<EditPasswordInfo>(`${LOCAL_BASE_URL}/users/me`, (req, res, ctx) => {
    const token = req.headers.get('Authorization');
    const editPasswordInfo: EditPasswordInfo = req.body;
    const targetUser = mockUserList.find(user => user.token === token);

    if (targetUser.password === editPasswordInfo.password) {
      mockUserList.forEach(user => {
        if (user.token === token) {
          user.password = editPasswordInfo.newPassword;
        }
      });

      return res(ctx.status(200));
    }

    return res(ctx.status(401));
  }),

  rest.delete(`${LOCAL_BASE_URL}/users/me`, (req, res, ctx) => {
    const token = req.headers.get('Authorization');
    const passwordInput = req.body;

    const targetUser = mockUserList.find(user => user.token === token);

    if (targetUser.password === passwordInput) {
      mockUserList = mockUserList.filter(user => user.email !== targetUser.email);

      console.log(mockUserList, 'delete');

      return res(ctx.status(200));
    }

    return res(ctx.status(401));
  }),
];
