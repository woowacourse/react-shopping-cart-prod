import PATH from 'constants/path';
import { rest } from 'msw';

const apiURL = 'http://localhost:8080/api';
const KEY = 'mockUserList';

const initMSW = () => {
  localStorage.setItem(
    KEY,
    JSON.stringify([
      {
        username: 'halee',
        password: 'halee123!',
        email: 'halee@naver.com',
        address: '잠실 루터 회관',
        phoneNumber: '010-0000-0000',
      },
    ]),
  );
};

const authHandlers = [
  // 회원가입
  rest.post(
    `${apiURL}${PATH.REQUEST_CUSTOMER}`,
    (
      req: {
        body: {
          username: string;
          password: string;
          email: string;
          address: string;
          phoneNumber: string;
        };
      },
      res,
      ctx,
    ) => {
      const mockUserList = JSON.parse(localStorage.getItem(KEY) || '[]');
      const newMockUserList = [...mockUserList, req.body];

      localStorage.setItem(KEY, JSON.stringify(newMockUserList));

      return res(ctx.status(201));
    },
  ),

  // 회원 정보 조회
  rest.get(`${apiURL}${PATH.REQUEST_CUSTOMER_ME}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'halee',
        email: 'halee@naver.com',
        address: '잠실 루터 회관',
        phoneNumber: '010-0000-0000',
      }),
    );
  }),

  // 회원 정보 수정
  rest.put(
    `${apiURL}${PATH.REQUEST_CUSTOMER_ME}`,
    (
      req: {
        body: {
          address: string;
          phoneNumber: string;
        };
      },
      res,
      ctx,
    ) => {
      return res(ctx.status(204));
    },
  ),

  // 회원탈퇴
  rest.delete(`${apiURL}${PATH.REQUEST_CUSTOMER_ME}`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // 로그인
  rest.post(
    `${apiURL}${PATH.REQUEST_AUTH_TOKEN}`,
    (req: { body: { username: string; password: string } }, res, ctx) => {
      const { username, password } = req.body;

      const mockUserList = JSON.parse(localStorage.getItem(KEY) || '[]');

      if (
        mockUserList.find(
          (user: { username: string; password: string }) =>
            user.username === username && user.password === password,
        )
      ) {
        return res(ctx.status(200), ctx.json({ accessToken: 'xxx.yyy.zzz' }));
      }

      return res(ctx.status(401), ctx.json({ errorMessage: 'UNAUTHORIZED' }));
    },
  ),
];

export default authHandlers;
export { initMSW };
