import cartActions from 'store/cart/action';
import cartThunk from 'store/cart/thunk';

import { requestLogin, requestProfile } from 'api/members';
import { REQUEST_STATUS, ACCESS_TOKEN_COOKIE_NAME, ACCESS_TOKEN_EXPIRED_TIME } from 'constants/';
import { getCookie, setCookie, removeCookie } from 'lib/cookieUtils';

import userActions from './action';

const userDefaultLoadedActions = () => async (dispatch) => {
  dispatch(cartThunk.updateList(true));
};

const userLogin = (loginId, password) => async (dispatch) => {
  dispatch(userActions.updateInfo.pending());

  const response = await requestLogin({ loginId, password });

  const { status, body } = response;
  const { message = '', accessToken, userKey, userId, nickname } = body;

  if (status === REQUEST_STATUS.FAIL) {
    dispatch(userActions.updateInfo.error(message));
    return response;
  }

  setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, ACCESS_TOKEN_EXPIRED_TIME);

  dispatch(userActions.updateInfo.success({ userKey, userId, nickname }));
  dispatch(userDefaultLoadedActions());

  return response;
};

const userLogout = () => (dispatch) => {
  removeCookie(ACCESS_TOKEN_COOKIE_NAME);

  dispatch(userActions.removeInfo());
  dispatch(cartActions.initList());
};

const getUserProfile = () => async (dispatch) => {
  dispatch(userActions.updateInfo.pending());

  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

  if (!accessToken) {
    dispatch(userLogout());
    return;
  }

  const response = await requestProfile();

  const { status, body } = response;
  const { userKey, userId, nickname } = body;

  if (status === REQUEST_STATUS.FAIL) {
    dispatch(userLogout());
    return response;
  }

  dispatch(userActions.updateInfo.success({ userKey, userId, nickname }));
  dispatch(userDefaultLoadedActions());

  return response;
};

const userThunk = { userLogin, userLogout, getUserProfile };

export default userThunk;
