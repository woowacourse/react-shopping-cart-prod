import { DB_KEYS, END_POINT } from 'mocks/handlers/constants';
import handleDB from 'mocks/handlers/handleDB';
import { rest } from 'msw';

const [getUser, setUser] = handleDB(DB_KEYS.USER);

const findUserData = (requestEmail) => {
  const currentUserList = getUser();

  return currentUserList.find(({ email }) => email === requestEmail);
};

export const handleCheckUniqueEmailRequest = (req, res, ctx) => {
  const currentUserList = getUser();
  const email = req.url.searchParams.get('email');

  const isUnique = currentUserList.every((user) => user.email !== email);

  return res(ctx.status(200), ctx.json({ success: isUnique }), ctx.delay());
};

export const handlePostUserRequest = (req, res, ctx) => {
  const currentUserList = getUser();
  const userData = req.body;

  currentUserList.push(userData);

  setUser(currentUserList);

  return res(ctx.status(201), ctx.delay());
};

export const handleLoginRequest = (req, res, ctx) => {
  const { email: requestEmail, password: requestPassword } = req.body;

  const userData = findUserData(requestEmail);

  if (userData !== undefined && userData.password === requestPassword) {
    const { email, nickname } = userData;

    return res(ctx.status(200), ctx.json({ nickname, token: email }));
  }

  return res(ctx.status(400));
};

export const handleUserGetRequest = (req, res, ctx) => {
  const token = req.headers.get('Authorization').split(' ')[1];

  const userData = findUserData(token);

  if (userData !== undefined) {
    const { email, nickname } = userData;

    return res(ctx.status(200), ctx.json({ email, nickname }));
  }

  return res(ctx.status(404));
};

export const handlePasswordCheckRequest = (req, res, ctx) => {
  const token = req.headers.get('Authorization').split(' ')[1];
  const { password } = req.body;

  const userData = findUserData(token);

  if (userData === undefined) {
    return res(ctx.status(404));
  }

  const success = userData.password === password;
  return res(ctx.status(200), ctx.json({ success }));
};

export const handleUserDataUpdateRequest = (req, res, ctx) => {
  const currentUserList = getUser();

  const token = req.headers.get('Authorization').split(' ')[1];
  const newData = req.body;

  const userDataIndex = currentUserList.findIndex(({ email }) => email === token);
  const userData = currentUserList[userDataIndex];

  if (userData === undefined) {
    return res(ctx.status(404));
  }

  currentUserList[userDataIndex] = { ...userData, ...newData };

  setUser(currentUserList);
  return res(ctx.status(204));
};

export const handleUserDeleteRequest = (req, res, ctx) => {
  const currentUserList = getUser();

  const token = req.headers.get('Authorization').split(' ')[1];

  const newUserList = currentUserList.filter(({ email }) => email !== token);

  setUser(newUserList);

  return res(ctx.status(204));
};

const userHandlers = [
  rest.get(`${END_POINT('MEMBERS_EMAIL_CHECK')}`, handleCheckUniqueEmailRequest),
  rest.post(`${END_POINT('MEMBERS_DEFAULT')}`, handlePostUserRequest),
  rest.post(`${END_POINT('LOGIN')}`, handleLoginRequest),
  rest.get(`${END_POINT('MEMBERS_ME')}`, handleUserGetRequest),
  rest.post(`${END_POINT('MEMBERS_PASSWORD_CHECK')}`, handlePasswordCheckRequest),
  rest.patch(`${END_POINT('MEMBERS_ME')}`, handleUserDataUpdateRequest),
  rest.patch(`${END_POINT('MEMBERS_PASSWORD')}`, handleUserDataUpdateRequest),
  rest.delete(`${END_POINT('MEMBERS_ME')}`, handleUserDeleteRequest),
];

export default userHandlers;
