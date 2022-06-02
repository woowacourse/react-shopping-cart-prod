import { LOCAL_BASE_URL } from 'apis';
import { rest } from 'msw';
import { EditPasswordInfo, SignInInfo, SignUpInfo, UserInfo } from 'types/domain';
import { generateRandomCode } from 'utils';

let mockUserList: UserInfo[] = JSON.parse(localStorage.getItem('mockUserList')) || [];

export const userHandlers = [
  rest.post<SignUpInfo>(`${LOCAL_BASE_URL}/users`, (req, res, ctx) => {
    const signUpInfo: SignUpInfo = req.body;

    mockUserList = [...mockUserList, signUpInfo];
    localStorage.setItem('mockUserList', JSON.stringify(mockUserList));

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
    localStorage.setItem('mockUserList', JSON.stringify(mockUserList));

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

      localStorage.setItem('mockUserList', JSON.stringify(mockUserList));

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

      localStorage.setItem('mockUserList', JSON.stringify(mockUserList));

      return res(ctx.status(200));
    }

    return res(ctx.status(401));
  }),

  rest.post(`${LOCAL_BASE_URL}/login/auto`, (req, res, ctx) => {
    const token = req.headers.get('Authorization');

    const targetUser = mockUserList.find(user => user.token === token);

    if (targetUser) {
      const newToken = `Bearer ${generateRandomCode(4)}`;

      targetUser.token = newToken;

      localStorage.setItem('mockUserList', JSON.stringify(mockUserList));

      return res(
        ctx.status(200),
        ctx.json({
          email: targetUser.email,
          name: targetUser.name,
          token: targetUser.token,
        })
      );
    }

    return res(ctx.status(401));
  }),
];
