import { createAsyncState } from 'lib/redux-template';

import { MEMBERS_ACTIONS } from '../types';

const login = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_LOGIN_SUCCESS,
    payload,
    async: createAsyncState.success(),
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_LOGIN_ERROR,
    async: createAsyncState.error(payload),
  }),
};

const userInfoRefresh = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_INFO_REFRESH_SUCCESS,
    payload,
    async: createAsyncState.success(),
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_INFO_REFRESH_ERROR,
    async: createAsyncState.error(payload),
  }),
};

const profileEdit = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_PROFILE_EDIT_SUCCESS,
    payload,
    async: createAsyncState.success(),
  }),

  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_PROFILE_EDIT_ERROR,
    async: createAsyncState.error(payload),
  }),
};

const userDropOut = {
  success: (payload) => ({
    type: MEMBERS_ACTIONS.USER_DROP_OUT_SUCCESS,
    payload,
    async: createAsyncState.success(),
  }),
  error: (payload) => ({
    type: MEMBERS_ACTIONS.USER_DROP_OUT_ERROR,
    async: createAsyncState.error(payload),
  }),
};

const userLogout = () => ({ type: MEMBERS_ACTIONS.USER_LOGOUT });

export { login, userInfoRefresh, profileEdit, userLogout, userDropOut };
