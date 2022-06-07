import {
  requestLogin,
  requestPasswordUpdate,
  requestProfile,
  requestProfileUpdate,
} from 'api/members';
import { ACCESS_TOKEN_COOKIE_NAME, ACCESS_TOKEN_EXPIRED_TIME, REQUEST_STATUS } from 'constants/';
import { getCookie, setCookie } from 'lib/cookieUtils';

import * as memberActions from './action';

const userLogin =
  ({ userId, password }) =>
  async (dispatch) => {
    const response = await requestLogin({ userId, password });
    const { status, content } = response;

    if (status === REQUEST_STATUS.FAIL) {
      dispatch(memberActions.login.error(content.message));
      return response;
    }

    setCookie(ACCESS_TOKEN_COOKIE_NAME, content.accessToken, ACCESS_TOKEN_EXPIRED_TIME);
    dispatch(memberActions.login.success(content));
    return response;
  };

const userProfile = () => async (dispatch) => {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

  if (!accessToken) return;

  const response = await requestProfile();
  const { status, content } = response;

  if (status === REQUEST_STATUS.FAIL) {
    dispatch(memberActions.userInfoRefresh.error(content.message));
    return response;
  }

  dispatch(memberActions.userInfoRefresh.success(content));
  return response;
};

const userNicknameEdit =
  ({ newNickname, password }) =>
  async (dispatch) => {
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

    if (!accessToken) return;

    const response = await requestProfileUpdate({ newNickname, password });
    const { status, content } = response;

    if (status === REQUEST_STATUS.FAIL) {
      dispatch(memberActions.userProfileEdit.error(content.message));
      return response;
    }

    dispatch(memberActions.userProfileEdit.success(content));
    return response;
  };

const userPasswordEdit =
  ({ oldPassword, newPassword }) =>
  async (dispatch) => {
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME);

    if (!accessToken) return;

    const response = await requestPasswordUpdate({ oldPassword, newPassword });
    const { status, content } = response;

    if (status === REQUEST_STATUS.FAIL) {
      dispatch(memberActions.userPasswordEdit.error(content.message));
      return response;
    }

    dispatch(memberActions.userPasswordEdit.success(content));
    return response;
  };

export { userLogin, userProfile, userNicknameEdit, userPasswordEdit };
