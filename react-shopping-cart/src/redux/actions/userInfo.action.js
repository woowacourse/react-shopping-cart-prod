export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_PASSWORD_CHECK = 'SET_PASSWORD_CHECK';
export const SET_NAME = 'SET_NAME';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER';
export const SET_USER_INFO = 'SET_USER_INFO';
export const RESET_USER_INFO = 'RESET_USER_INFO';
export const SET_EMAIL_DISABLED = 'SET_EMAIL_DISABLED';

export const setEmail = email => ({ type: SET_EMAIL, payload: { email } });
export const setPassword = password => ({ type: SET_PASSWORD, payload: { password } });
export const setPasswordCheck = passwordCheck => ({
  type: SET_PASSWORD_CHECK,
  payload: { passwordCheck },
});
export const setName = name => ({ type: SET_NAME, payload: { name } });
export const setAddress = address => ({ type: SET_ADDRESS, payload: { address } });
export const setPhoneNumber = (numberPlace, phoneNumber) => ({
  type: SET_PHONE_NUMBER,
  payload: { numberPlace, phoneNumber },
});
export const setUserInfo = info => ({ type: SET_USER_INFO, payload: { info } });
export const resetUserInfo = () => ({ type: RESET_USER_INFO, payload: {} });
export const setEmailDisabled = disabled => ({ type: SET_EMAIL_DISABLED, payload: { disabled } });
