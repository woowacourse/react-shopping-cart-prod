import { rest } from 'msw';

import { isUserId, isUserPassword, isNickname } from 'lib/validateUtils';

import { MOCK_DB } from 'mocks/db';

const membersDB = MOCK_DB.members;

const membersHandlers = [
  // 회원가입 API - POST
  rest.post('./customers/signUp', (req, res, ctx) => {
    const { userId, password, nickname } = req.body;

    if (!isUserId(userId)) {
      return res(ctx.status(400), ctx.json({ message: '이메일을 정확히 입력해주세요.' }));
    }

    if (!isUserPassword(password)) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호 정확히 입력해주세요.' }));
    }

    if (!isNickname(nickname)) {
      return res(ctx.status(400), ctx.json({ message: '닉네임을 정확히 입력해주세요.' }));
    }

    const accessToken = membersDB.push({ userId, password, nickname }) - 1;
    membersDB[accessToken].accessToken = accessToken;

    return res(ctx.status(201), ctx.json({}));
  }),

  // 로그인 API - POST
  rest.post('./customers/login', (req, res, ctx) => {
    const { userId, password } = req.body;
    const userInfo = membersDB.find((user) => user.userId === userId && user.password === password);

    if (!userInfo) {
      return res(ctx.status(400), ctx.json({ message: '로그인에 실패하였습니다.' }));
    }

    const responseUserInfo = { ...userInfo };
    delete responseUserInfo.password;

    return res(ctx.status(200), ctx.json(responseUserInfo));
  }),

  // 회원정보 요청 - GET
  rest.get('./auth/customers/profile', (req, res, ctx) => {
    // 액세스토큰을 통해 유저 아이디, 닉네임 반환
    const accessToken = req.headers.get('Authorization').replace('Bearer ', '');
    const userInfo = membersDB.find((user) => user.accessToken === accessToken);
    if (!userInfo) {
      return res(
        ctx.status(400),
        ctx.json({ message: '권한이 없거나, 존재하지 않는 정보입니다.' }),
      );
    }

    // 성공 or 실패 메시지 보내기 (200)
    return res(ctx.status(200), ctx.json(userInfo));
  }),

  // 중복 아이디, 닉네임 체크 API - POST
  rest.get('./customers/check', (req, res, ctx) => {
    const query = Object.fromEntries(req.url.searchParams.entries());
    const isExist = Object.entries(query).every(
      ([key, value]) => !!membersDB.find((user) => user[key] === value),
    );

    const queryName = req.url.href.includes('nickname=') ? '닉네임' : '이메일';

    return res(
      ctx.status(isExist ? 400 : 200),
      ctx.json({ message: `이미 존재하는 ${queryName}입니다.` }),
    );
  }),

  // 회원정보 수정
  rest.patch('./auth/customers/profile', (req, res, ctx) => {
    // 액세스토큰을 통해 유저 아이디, 닉네임 반환
    const accessToken = req.headers.get('Authorization').replace('Bearer ', '');
    const userInfo = membersDB.find((user) => user.accessToken === accessToken);
    if (!userInfo) {
      return res(
        ctx.status(400),
        ctx.json({ message: '권한이 없거나, 존재하지 않는 정보입니다.' }),
      );
    }

    if (userInfo.password !== req.body.password) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 틀렸습니다.' }));
    }

    userInfo.nickname = req.body.newNickname;

    return res(ctx.status(200), ctx.json(userInfo));
  }),

  rest.patch('./auth/customers/profile/password', (req, res, ctx) => {
    // 액세스토큰을 통해 유저 아이디, 비밀번호 반환
    const accessToken = req.headers.get('Authorization').replace('Bearer ', '');
    const userInfo = membersDB.find((user) => user.accessToken === accessToken);
    if (!userInfo) {
      return res(
        ctx.status(400),
        ctx.json({ message: '권한이 없거나, 존재하지 않는 정보입니다.' }),
      );
    }

    if (userInfo.password !== req.body.oldPassword) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 틀렸습니다.' }));
    }

    userInfo.password = req.body.newPassword;

    return res(ctx.status(200), ctx.json(userInfo));
  }),
];

export default membersHandlers;
