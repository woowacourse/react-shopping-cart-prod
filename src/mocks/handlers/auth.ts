import { AUTH_BASE_URL } from 'apis';
import { rest } from 'msw';
import type { LoginResponse, UserInfo, UserInfoWithPassword } from 'types/domain';

export const authHandler = [
  // 회원가입
  rest.post<UserInfoWithPassword, null, UserInfo>(`${AUTH_BASE_URL}/customers`, (req, res, ctx) => {
    const userInfo = req.body;

    users.push(userInfo);
    localStorage.setItem('mock-users', JSON.stringify(users));

    const savedUserInfo = { ...userInfo };

    delete savedUserInfo.password;

    return res(ctx.status(201), ctx.json(savedUserInfo));
  }),

  rest.post<Omit<UserInfoWithPassword, 'name'>, null, LoginResponse | string>(
    `${AUTH_BASE_URL}/login`,
    (req, res, ctx) => {
      const loginInfo = req.body;
      const authenticatedUser = users.find(
        user => user.loginId === loginInfo.loginId && user.password === loginInfo.password
      );

      if (authenticatedUser) {
        return res(ctx.status(200), ctx.json({ name: authenticatedUser.name, accessToken: 'fff' }));
      }

      return res(ctx.status(401), ctx.body('로그인에 실패하였습니다.'));
    }
  ),
];

// mock data
export const users: UserInfoWithPassword[] = JSON.parse(localStorage.getItem('mock-users')) ?? [];
