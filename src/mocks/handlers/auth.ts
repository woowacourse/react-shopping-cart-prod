import { AUTH_BASE_URL } from 'apis';
import { rest } from 'msw';
import type { LoginResponse, UserInfo } from 'types/domain';

export const authHandler = [
  // 회원가입
  rest.post<UserInfo, null, Omit<UserInfo, 'password'>>(
    `${AUTH_BASE_URL}/customers`,
    (req, res, ctx) => {
      const userInfo = req.body;

      users.push(userInfo);
      localStorage.setItem('mock-users', JSON.stringify(users));

      delete userInfo.password;

      return res(ctx.status(201), ctx.json(userInfo));
    }
  ),

  rest.post<Omit<UserInfo, 'name'>, null, LoginResponse>(
    `${AUTH_BASE_URL}/login`,
    (req, res, ctx) => {
      const loginInfo = req.body;

      const authenticatedUser = users.find(
        user => user.loginId === loginInfo.loginId && user.password === loginInfo.password
      );

      if (authenticatedUser) {
        return res(ctx.status(200), ctx.json({ name: authenticatedUser.name, accessToken: 'fff' }));
      }

      return res(ctx.status(401));
    }
  ),
];

// mock data
export const users: UserInfo[] = JSON.parse(localStorage.getItem('mock-users')) ?? [];
