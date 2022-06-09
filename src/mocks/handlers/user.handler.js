import { rest } from 'msw';

import { API_ENDPOINT } from 'api/constants';
import { BASE_URL } from 'api/customInstance';

const userDB = () => {
  let user = JSON.parse(window.localStorage.getItem('server-user')) || [];

  const getUser = () => user;
  const setUser = (newUser) => {
    user = newUser;
    window.localStorage.setItem('server-user', JSON.stringify(newUser));
  };

  return { getUser, setUser };
};

const { getUser, setUser } = userDB();

const findUserData = (requestEmail) => {
  const currentUserList = getUser();

  return currentUserList.find(({ email }) => email === requestEmail);
};

const handleCheckUniqueEmailRequest = (req, res, ctx) => {
  const currentUserList = getUser();
  const email = req.url.searchParams.get('email');

  const isUnique = currentUserList.every((user) => user.email !== email);

  return res(ctx.status(200), ctx.json({ unique: isUnique }));
};

const handlePostUserRequest = (req, res, ctx) => {
  const currentUserList = getUser();
  const userData = req.body;

  currentUserList.push(userData);

  setUser(currentUserList);

  return res(ctx.status(201));
};

const handleLoginRequest = (req, res, ctx) => {
  const { email: requestEmail, password: requestPassword } = req.body;

  const userData = findUserData(requestEmail);

  if (userData !== undefined && userData.password === requestPassword) {
    const { email, nickname } = userData;

    return res(ctx.status(200), ctx.json({ nickname, token: email }));
  }

  return res(ctx.status(400));
};

const handleUserGetRequest = (req, res, ctx) => {
  const token = req.headers.get('Authorization').split(' ')[1];

  const userData = findUserData(token);

  if (userData !== undefined) {
    const { email, nickname } = userData;

    return res(ctx.status(200), ctx.json({ email, nickname }));
  }

  return res(ctx.status(404));
};

const handlePasswordCheckRequest = (req, res, ctx) => {
  const token = req.headers.get('Authorization').split(' ')[1];
  const { password } = req.body;

  const userData = findUserData(token);

  if (userData === undefined) {
    return res(ctx.status(404));
  }

  const success = userData.password === password;
  return res(ctx.status(200), ctx.json({ success }));
};

const handleUserDataUpdateRequest = (req, res, ctx) => {
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

const handleUserDeleteRequest = (req, res, ctx) => {
  const currentUserList = getUser();

  const token = req.headers.get('Authorization').split(' ')[1];

  const newUserList = currentUserList.filter(({ email }) => email !== token);

  setUser(newUserList);

  return res(ctx.status(204));
};

export default [
  rest.get(`${BASE_URL}${API_ENDPOINT.USER.EMAIL_CHECK}`, handleCheckUniqueEmailRequest),
  rest.post(`${BASE_URL}${API_ENDPOINT.USER.BASE}`, handlePostUserRequest),
  rest.post(`${BASE_URL}${API_ENDPOINT.LOGIN}`, handleLoginRequest),
  rest.get(`${BASE_URL}${API_ENDPOINT.USER.ME}`, handleUserGetRequest),
  rest.post(`${BASE_URL}${API_ENDPOINT.USER.PASSWORD_CHECK}`, handlePasswordCheckRequest),
  rest.patch(`${BASE_URL}${API_ENDPOINT.USER.ME}`, handleUserDataUpdateRequest),
  rest.patch(`${BASE_URL}${API_ENDPOINT.USER.PASSWORD}`, handleUserDataUpdateRequest),
  rest.delete(`${BASE_URL}${API_ENDPOINT.USER.ME}`, handleUserDeleteRequest),
];
