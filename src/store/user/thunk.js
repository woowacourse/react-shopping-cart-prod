import { requestLogin, requestProfile } from 'api/members';
import { REQUEST_STATUS, ACCESS_TOKEN_COOKIE_NAME, ACCESS_TOKEN_EXPIRED_TIME } from 'constants/';
import { getCookie, removeCookie, setCookie } from 'lib/cookieUtils';

import userActions from './action';

const userLogin = (loginId, password) => async (dispatch) => {
  const response = await requestLogin({ loginId, password });

  const { status, body } = response;
  const { message = '', accessToken, userKey, userId, nickname } = body;

  if (status === REQUEST_STATUS.FAIL) {
    dispatch(userActions.updateInfo.error(message));
    return response;
  }

  setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, ACCESS_TOKEN_EXPIRED_TIME);
  dispatch(userActions.updateInfo.success({ userKey, userId, nickname }));

  return response;
};

const getUserProfile = () => async (dispatch) => {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

  if (!accessToken) return;

  const response = await requestProfile();

  const { status, body } = response;
  const { userKey, userId, nickname } = body;

  if (status === REQUEST_STATUS.FAIL) {
    removeCookie(ACCESS_TOKEN_COOKIE_NAME);
    return response;
  }

  dispatch(userActions.updateInfo.success({ userKey, userId, nickname }));
  return response;
};

const userThunk = { userLogin, getUserProfile };

export default userThunk;
