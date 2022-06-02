import apiInstance from 'api/customInstance';
import { API_ENDPOINT } from 'api/constants';

export const sendCheckEmailDuplicateRequest = async (email) => {
  const response = await apiInstance.get(API_ENDPOINT.USER, {
    params: {
      email,
    },
  });

  const { success } = response.data;

  return success;
};

export const sendAddUserRequest = async (userData) => {
  await apiInstance.post(API_ENDPOINT.USER, userData);
};

export const sendLoginRequest = async (loginData) => {
  const response = await apiInstance.post(API_ENDPOINT.LOGIN, loginData);
  const { nickname, token } = response.data;

  window.sessionStorage.setItem('nickname', nickname);
  window.sessionStorage.setItem('token', token);

  apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return nickname;
};

export const sendGetUserRequest = async () => {
  const response = await apiInstance.get(API_ENDPOINT.AUTH.ME);

  return response.data;
};

export const sendCheckPasswordRequest = async (password) => {
  const response = await apiInstance.post(API_ENDPOINT.AUTH.PASSWORD_CHECK, {
    password,
  });

  const { success } = response.data;

  return success;
};

export const sendUpdateNicknameRequest = async (nickname) => {
  await apiInstance.patch(API_ENDPOINT.AUTH.ME, {
    nickname,
  });
};

export const sendUpdatePasswordRequest = async (password) => {
  await apiInstance.patch(API_ENDPOINT.AUTH.PASSWORD, {
    password,
  });
};

export const sendDeleteUserRequest = async () => {
  await apiInstance.delete(API_ENDPOINT.AUTH.ME);
};
