export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = accessToken => ({
  type: LOGIN_USER,
  payload: accessToken,
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});
