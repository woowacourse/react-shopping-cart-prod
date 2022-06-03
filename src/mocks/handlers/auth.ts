import { AUTH_BASE_URL } from 'apis';
import { rest } from 'msw';
import type { LoginResponse, UserInfo, UserInfoWithPassword } from 'types/domain';

const MOCK_ERROR_MESSAGE = {
  LOGIN_FAILURE: '로그인에 실패하였습니다.',
  PASSWORD_FAILURE: '비밀번호를 다시 확인해주세요',
};

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

      return res(ctx.status(401), ctx.body(MOCK_ERROR_MESSAGE.LOGIN_FAILURE));
    }
  ),

  rest.get<null, null, UserInfo>(`${AUTH_BASE_URL}/customers/me`, (req, res, ctx) => {
    if (users.length === 0) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(users[0]));
  }),

  rest.put<UserInfoWithPassword, null, UserInfo | string>(
    `${AUTH_BASE_URL}/customers/me`,
    (req, res, ctx) => {
      const { name, loginId, password } = req.body;

      const authenticatedUser = users.find(
        user => user.loginId === loginId && user.password === password
      );

      if (authenticatedUser) {
        return res(
          ctx.status(200),
          ctx.json({
            name,
            loginId,
          })
        );
      }

      return res(ctx.status(400), ctx.body(MOCK_ERROR_MESSAGE.PASSWORD_FAILURE));
    }
  ),

  rest.delete<Pick<UserInfoWithPassword, 'password'>, null, null | string>(
    `${AUTH_BASE_URL}/customers/me`,
    (req, res, ctx) => {
      const { password } = req.body;
      const authenticatedUserIdx = users.findIndex(user => user.password === password);

      if (authenticatedUserIdx !== -1) {
        const newUsers = [...users];

        newUsers.splice(authenticatedUserIdx, 1);
        localStorage.setItem('mock-users', JSON.stringify(newUsers));

        return res(ctx.status(204));
      }

      return res(ctx.status(400), ctx.body(MOCK_ERROR_MESSAGE.PASSWORD_FAILURE));
    }
  ),
];

// mock data
export const users: UserInfoWithPassword[] = JSON.parse(localStorage.getItem('mock-users')) ?? [];
