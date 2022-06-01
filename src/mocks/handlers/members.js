import { rest } from 'msw';

import { memberValidate } from 'lib/validateUtils';

import { MOCK_DB } from 'mocks/db';

const membersDB = MOCK_DB.members;

const membersHandlers = [
  // 회원가입 API - POST
  rest.get('/customers/signUp', (req, res, ctx) => {
    const { userId, password, nickname } = req.body;

    if (!memberValidate.userId(userId)) {
      return res(ctx.status(400), ctx.json({ message: '이메일을 정확히 입력해주세요.' }));
    }

    if (!memberValidate.password(password)) {
      return res(ctx.status(400), ctx.json({ message: '비밀번호 정확히 입력해주세요.' }));
    }

    if (!memberValidate.nickname(nickname)) {
      return res(ctx.status(400), ctx.json({ message: '닉네임을 정확히 입력해주세요.' }));
    }

    const accessToken = membersDB.push({ userId, password, nickname }) - 1;
    membersDB[accessToken].accessToken = accessToken;

    return res(ctx.status(201));
  }),

  // 로그인 API - POST
  rest.get('/customers/login', (req, res, ctx) => {
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
  rest.get('/customers/profile', (req, res, ctx) => {
    // 액세스토큰을 통해 유저 아이디, 닉네임 반환
    const accessToken = req.headers.get('accessToken');
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
  rest.get('/customers/exist', (req, res, ctx) => {
    const isExist = Object.entries(req.body).every(
      ([key, value]) => !!membersDB.find((user) => user[key] !== value),
    );

    return isExist
      ? res(ctx.status(400), ctx.json({ message: '이미 존재하는 유저 정보입니다.' }))
      : res(ctx.status(200));
  }),

  // -- 이후
  // 회원정보 수정
  // 회원 탈퇴
];

export default membersHandlers;
