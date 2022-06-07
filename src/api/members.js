import { request } from 'lib/requestUtils';

const requestSignUp = ({ userId, password, nickname }) =>
  request('/customers/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, password, nickname }),
  });

const requestLogin = ({ userId, password }) =>
  request('/customers/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, password }),
  });

const requestProfile = () =>
  request(
    '/auth/customers/profile',
    {
      method: 'GET',
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestProfileUpdate = ({ newNickname, password }) =>
  request(
    '/auth/customers/profile',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newNickname, password }),
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestPasswordUpdate = ({ oldPassword, newPassword }) =>
  request(
    '/auth/customers/profile/password',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestUserDropOut = (password) =>
  request(
    '/auth/customers/profile',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestCheckUserId = (userId) =>
  request(`/customers/check?userId=${encodeURIComponent(userId)}`, {
    method: 'GET',
  });
const requestCheckUserNickname = (nickname) =>
  request(`/customers/check?nickname=${encodeURIComponent(nickname)}`, {
    method: 'GET',
  });
export {
  requestSignUp,
  requestLogin,
  requestProfile,
  requestProfileUpdate,
  requestUserDropOut,
  requestPasswordUpdate,
  requestCheckUserId,
  requestCheckUserNickname,
};
