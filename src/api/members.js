import { request } from 'lib/requestUtils';

const requestSignUp = async ({ userId, password, nickname }) => {
  const { status, body } = await request('/customers/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, password, nickname }),
  });
  const { message = '' } = body;

  return { status, message };
};

const requestLogin = async ({ loginId, password }) => {
  const { status, body } = await request('/customers/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ loginId, password }),
  });
  const { message = '', accessToken = '', id: userKey = -1, userId = '', nickname = '' } = body;

  return { status, message, accessToken, userKey, userId, nickname };
};

const requestProfile = async () => {
  const { status, body } = await request(
    '/auth/customers/profile',
    {
      method: 'GET',
    },
    {
      isAccessTokenUsed: true,
    },
  );
  const { message = '', id: userKey = -1, userId = '', nickname = '' } = body;

  return { status, message, userKey, userId, nickname };
};

const requestProfileUpdate = async (editTarget = {}) => {
  const { status, body } = await request(
    '/auth/customers/profile',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editTarget),
    },
    {
      isAccessTokenUsed: true,
    },
  );
  const { message = '' } = body;

  return { status, message };
};

const requestPasswordUpdate = async ({ oldPassword, newPassword }) => {
  const { status, body } = await request(
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
  const { message = '' } = body;

  return { status, message };
};

const requestUserDropOut = async (password) => {
  const { status, body } = await request(
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
  const { message = '' } = body;

  return { status, message };
};

const requestCheckUserId = async (userId) => {
  const { status, body } = await request(`/customers/check?userId=${encodeURIComponent(userId)}`, {
    method: 'GET',
  });
  const { message = '' } = body;

  return { status, message };
};

const requestCheckUserNickname = async (nickname) => {
  const { status, body } = await request(
    `/customers/check?nickname=${encodeURIComponent(nickname)}`,
    {
      method: 'GET',
    },
  );
  const { message = '' } = body;

  return { status, message };
};

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
