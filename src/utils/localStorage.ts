import { UserInfo } from 'os';

export const KEYS = {
  MOCK_CART_LIST: 'mockCartList',
  MOCK_USER_LIST: 'mockUserList',
  TOKEN: 'token',
};

export const getLocalStorageToken = () => {
  return localStorage.getItem(KEYS.TOKEN);
};
export const setLocalStorageToken = token => {
  localStorage.setItem(KEYS.TOKEN, token);
};

export const getLocalStorageCartList = () => {
  return JSON.parse(localStorage.getItem(KEYS.MOCK_CART_LIST)) || [];
};
export const setLocalStorageCartList = mockCartList => {
  localStorage.setItem(KEYS.MOCK_CART_LIST, JSON.stringify(mockCartList));
};

export const getLocalStorageUserList = () => {
  return JSON.parse(localStorage.getItem(KEYS.MOCK_USER_LIST)) || [];
};
export const setLocalStorageUserList = mockUserList => {
  localStorage.setItem(KEYS.MOCK_USER_LIST, JSON.stringify(mockUserList));
};
