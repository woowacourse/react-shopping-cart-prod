import { axios } from 'configs/api';
import { rest } from 'msw';
import { User } from 'types/index';

import PATH from 'constants/path';

const { baseURL } = axios.defaults;
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
  ])
);

const authHandlers = [
  // 회원가입
  rest.post(
    `${baseURL}${PATH.REQUEST_SIGNUP}`,
    (
      req: {
        body: User;
      },
      res,
      ctx
    ) => {
      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      );

      const newMockUserList = [
        ...mockUserList,
        { ...req.body, accessToken: new Date() },
      ];

      localStorage.setItem(KEY, JSON.stringify(newMockUserList));

      return res(ctx.status(201));
    }
  ),

  // username 중복 확인
  rest.post(
    `${baseURL}${PATH.REQUEST_SIGNUP_DUPLICATION_USERNAME}`,
    (req: { body: { username: User['username'] } }, res, ctx) => {
      const { username } = req.body;

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      );
      const hasDuplicatedUsername = mockUserList.some(
        user => user.username === username
      );

      if (hasDuplicatedUsername) {
        return res(ctx.status(400));
      }

      return res(ctx.status(201));
    }
  ),

  // email 중복 확인
  rest.post(
    `${baseURL}${PATH.REQUEST_SIGNUP_DUPLICATION_EMAIL}`,
    (req: { body: { email: User['email'] } }, res, ctx) => {
      const { email } = req.body;

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      );
      const hasDuplicatedEmail = mockUserList.some(
        user => user.email === email
      );

      if (hasDuplicatedEmail) {
        return res(ctx.status(400));
      }

      return res(ctx.status(201));
    }
  ),

  // 회원 정보 조회
  rest.get(`${baseURL}${PATH.REQUEST_USER_INFO}`, (req, res, ctx) => {
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
      ctx.json({
        username: targetUser.username,
        email: targetUser.email,
        address: targetUser.address,
        phoneNumber: targetUser.phoneNumber,
      })
    );
  }),

  // 회원 정보 수정
  rest.put(
    `${baseURL}${PATH.REQUEST_USER_INFO}`,
    (
      req: {
        headers: Headers;
        body: Pick<User, 'address' | 'phoneNumber'>;
      },
      res,
      ctx
    ) => {
      const { address, phoneNumber } = req.body;
      const accessToken = req.headers.get('authorization')?.split(' ')[1];

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      );

      const targetUserIndex = mockUserList.findIndex(
        user => user.accessToken === accessToken
      );

      if (targetUserIndex < 0) {
        return res(ctx.status(401));
      }

      mockUserList[targetUserIndex].address = address;
      mockUserList[targetUserIndex].phoneNumber = phoneNumber;

      localStorage.setItem(KEY, JSON.stringify(mockUserList));

      return res(ctx.status(204));
    }
  ),

  // 회원탈퇴
  rest.delete(`${baseURL}${PATH.REQUEST_USER_INFO}`, (req, res, ctx) => {
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

    const newMockUserList = mockUserList.filter(
      user => user.username !== targetUser.username
    );

    localStorage.setItem(KEY, JSON.stringify(newMockUserList));

    return res(ctx.status(204));
  }),

  // 로그인
  rest.post(
    `${baseURL}${PATH.REQUEST_LOGIN}`,
    (req: { body: Pick<User, 'username' | 'password'> }, res, ctx) => {
      const { username, password } = req.body;

      const mockUserList: Array<MockUser> = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      );

      const targetUser = mockUserList.find(
        user => user.username === username && user.password === password
      );

      if (!targetUser) {
        return res(ctx.status(401), ctx.json({ errorMessage: 'UNAUTHORIZED' }));
      }

      return res(
        ctx.status(200),
        ctx.json({ accessToken: targetUser.accessToken })
      );
    }
  ),
];

export default authHandlers;
