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
      return res(
        ctx.status(400),
        ctx.json({ message: '이메일 또는 비밀번호를 정확히 입력해주세요.' }),
      );
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

    if (isExist) {
      return res(ctx.status(400), ctx.json({ message: `이미 존재하는 ${queryName}입니다.` }));
    }

    return res(ctx.status(200));
  }),

  // -- 이후
  // 회원정보 수정 전 패스워드 확인
  rest.post('./auth/customers/match/password', (req, res, ctx) => {
    const { password } = req.body;

    const accessToken = req.headers.get('Authorization').replace('Bearer ', '');
    const userInfo = membersDB.find((user) => user.accessToken === accessToken);

    if (!userInfo || userInfo.password !== password) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 올바르지 않습니다.' }));
    }

    return res(ctx.status(200));
  }),

  // 회원정보 수정
  rest.patch('./auth/customers/profile', (req, res, ctx) => {
    const { nickname, password } = req.body;

    const accessToken = req.headers.get('Authorization').replace('Bearer ', '');
    const userInfo = membersDB.find((user) => user.accessToken === accessToken);

    if (!userInfo || userInfo.password !== password) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 올바르지 않습니다.' }));
    }

    userInfo.nickname = nickname;
    return res(ctx.status(200));
  }),

  // 패스워드 변경
  rest.patch('./auth/customers/profile/password', (req, res, ctx) => {
    const { oldPassword, newPassword } = req.body;

    const accessToken = req.headers.get('Authorization').replace('Bearer ', '');
    const userInfo = membersDB.find((user) => user.accessToken === accessToken);

    if (!userInfo || userInfo.password !== oldPassword) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 올바르지 않습니다.' }));
    }

    userInfo.password = newPassword;
    return res(ctx.status(200));
  }),
  // 회원 탈퇴
];

export default membersHandlers;
