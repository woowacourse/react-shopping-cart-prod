import PATH from 'constants/path';
import { User } from 'types/index';
import { rest } from 'msw';

const apiURL = 'http://localhost:8080/api';
const KEY = 'mockUserList';

type MockUser = User & { accessToken: string };

localStorage.setItem(
  KEY,
  JSON.stringify([
    {
      username: 'halee',
      password: 'halee123!',
      email: 'halee@naver.com',
      address: '잠실 루터 회관',
      phoneNumber: '010-0000-0000',
      accessToken: 'xxx.yyy.zzz',
    },
  ]),
);

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
      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]',
      );
      const { username, email } = req.body;

      const hasDuplicatedUser = mockUserList.some(
        user => user.username === username || user.email === email,
      );

      if (hasDuplicatedUser) {
        return res(ctx.status(400));
      }

      const newMockUserList = [
        ...mockUserList,
        { ...req.body, accessToken: new Date() },
      ];

      localStorage.setItem(KEY, JSON.stringify(newMockUserList));

      return res(ctx.status(201));
    },
  ),

  // 회원 정보 조회
  rest.get(`${apiURL}${PATH.REQUEST_CUSTOMER_ME}`, (req, res, ctx) => {
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    const mockUserList: Array<MockUser> = JSON.parse(
      localStorage.getItem(KEY) || '[]',
    );

    const targetUser = mockUserList.find(
      user => user.accessToken === accessToken,
    );

    if (!targetUser) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: targetUser.username,
        email: targetUser.email,
        address: targetUser.address,
        phoneNumber: targetUser.phoneNumber,
      }),
    );
  }),

  // 회원 정보 수정
  rest.put(
    `${apiURL}${PATH.REQUEST_CUSTOMER_ME}`,
    (
      req: {
        headers: Headers;
        body: {
          address: string;
          phoneNumber: string;
        };
      },
      res,
      ctx,
    ) => {
      const { address, phoneNumber } = req.body;
      const accessToken = req.headers.get('authorization')?.split(' ')[1];

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]',
      );

      const targetUserIndex = mockUserList.findIndex(
        user => user.accessToken === accessToken,
      );

      if (targetUserIndex < 0) {
        return res(ctx.status(401));
      }

      mockUserList[targetUserIndex].address = address;
      mockUserList[targetUserIndex].phoneNumber = phoneNumber;

      localStorage.setItem(KEY, JSON.stringify(mockUserList));

      return res(ctx.status(204));
    },
  ),

  // 회원탈퇴
  rest.delete(`${apiURL}${PATH.REQUEST_CUSTOMER_ME}`, (req, res, ctx) => {
    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    const mockUserList: Array<MockUser> = JSON.parse(
      localStorage.getItem(KEY) || '[]',
    );

    const targetUser = mockUserList.find(
      user => user.accessToken === accessToken,
    );
    if (!targetUser) {
      return res(ctx.status(401));
    }

    const newMockUserList = mockUserList.filter(
      user => user.username !== targetUser.username,
    );

    localStorage.setItem(KEY, JSON.stringify(newMockUserList));

    return res(ctx.status(204));
  }),

  // 로그인
  rest.post(
    `${apiURL}${PATH.REQUEST_AUTH_TOKEN}`,
    (req: { body: { username: string; password: string } }, res, ctx) => {
      const { username, password } = req.body;

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]',
      );

      const targetUser = mockUserList.find(
        user => user.username === username && user.password === password,
      );

      if (!targetUser) {
        return res(ctx.status(401), ctx.json({ errorMessage: 'UNAUTHORIZED' }));
      }

      return res(
        ctx.status(200),
        ctx.json({ accessToken: targetUser.accessToken }),
      );
    },
  ),
];

export default authHandlers;
