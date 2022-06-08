import { createAsyncState } from 'lib/requestUtils';

import { MEMBERS_ACTIONS } from '../types';

const login = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_LOGIN_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_LOGIN_ERROR,
    payload,
  }),
};

const userInfoRefresh = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_INFO_REFRESH_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_INFO_REFRESH_ERROR,
    payload,
  }),
};

const userProfileEdit = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_PROFILE_EDIT_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_PROFILE_EDIT_ERROR,
    payload,
  }),
};

const userPasswordEdit = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_PASSWORD_EDIT_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_PASSWORD_EDIT_ERROR,
    payload,
  }),
};

const userDropOut = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_DROP_OUT_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_DROP_OUT_ERROR,
    payload,
  }),
};

const userLogout = () => ({ type: MEMBERS_ACTIONS.USER_LOGOUT });

export { login, userInfoRefresh, userProfileEdit, userPasswordEdit, userLogout, userDropOut };
